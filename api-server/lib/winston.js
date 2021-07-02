import winston from 'winston';
import expressWinston from 'express-winston';

import { environment } from '../common/config';

let level;
let silent;

switch (environment) {
  case 'production':
    level = 'info';
    silent = false;
    break;
  case 'development':
  case 'compose':
    level = 'debug';
    silent = false;
    break;
  default:
    level = 'emerg';
    silent = true;
    break;
}

const formatDynamicMetaData = (req, res) => {
  const httpRequest = {};
  const meta = {};
  if (req) {
    meta.httpRequest = httpRequest;
    httpRequest.requestMethod = req.method;
    httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`;
    httpRequest.protocol = `HTTP/${req.httpVersion}`;

    // this includes both ipv6 and ipv4 addresses separated by ':'
    httpRequest.remoteIp = req.clientIp;

    httpRequest.remoteIp = req.clientIp.indexOf(':') >= 0
      ? req.clientIp.substring(req.clientIp.lastIndexOf(':') + 1)
      : req.clientIp; // just ipv4
    httpRequest.requestSize = req.socket.bytesRead;
    httpRequest.userAgent = req.get('User-Agent');
    httpRequest.referrer = req.get('Referrer');
    meta.user = req.user;
  }

  if (res) {
    meta.httpRequest = httpRequest;
    httpRequest.status = res.statusCode;
    httpRequest.latency = {
      seconds: Math.floor(res.responseTime / 1000),
      nanos: (res.responseTime % 1000) * 1000000,
    };
    if (res.body) {
      if (typeof res.body === 'object') {
        httpRequest.responseSize = JSON.stringify(res.body).length;
      } else if (typeof res.body === 'string') {
        httpRequest.responseSize = res.body.length;
      }
    }
  }
  return meta;
};

const logger = winston.createLogger({
  level,
  silent,
  defaultMeta: {
    service: 'api-server',
    version: '1.0.0',
  },
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize(),
      ),
    }),
  ],
  exitOnError: false,
});

const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: logger,
  metaField: null,
  requestWhitelist: ['headers', 'query', 'body'],
  responseWhitelist: ['body'],
  expressFormat: true,
  colorize: false,
  statusLevels: false,
  ignoreRoute: (req) => {
    if (req.path.startsWith('/docs')) return true;
    if (req.path.startsWith('/stylesheets')) return true;
    if (req.path.startsWith('/images')) return true;
    if (req.path.startsWith('/javascript')) return true;
    if (req.path.startsWith('/javascript')) return true;
    if (req.path === '/') return true;

    if (req.method === 'OPTIONS') return true;
    return false;
  },
  level: (req, res) => {
    let lvl = '';
    if (res.statusCode >= 100) {
      lvl = 'info';
    }
    if (res.statusCode >= 400) {
      lvl = 'warn';
    }
    if (res.statusCode >= 500) {
      lvl = 'error';
    }
    if (res.statusCode === 401 || res.statusCode === 403) {
      lvl = 'warn';
    }
    return lvl;
  },
  dynamicMeta: formatDynamicMetaData,
});

const expressWinstonErrorMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
  metaField: null,
  colorize: false,
  requestWhitelist: ['headers', 'query', 'body'],
  msg: '{{req.method}} {{req.path}} {{err.message}}',
  responseWhitelist: ['body'],
  dynamicMeta: formatDynamicMetaData,
});

export default class Logger {
  constructor(module) {
    if (Logger.instance == null) {
      Logger.instance = this;
    }
    this.logger = logger;
    this.expressWinstonMiddleware = expressWinstonMiddleware;
    this.expressWinstonErrorMiddleware = expressWinstonErrorMiddleware;
    this.module = module;

    return Logger.instance;
  }

  info(message) {
    return this.logger.info(message, {
      labels: {
        module: this.module.id,
      },
    });
  }

  error(message) {
    return this.logger.error(message, {
      labels: {
        module: this.module.id,
      },
    });
  }

  debug(message) {
    return this.logger.debug(message, {
      labels: {
        module: this.module.id,
      },
    });
  }

  warn(message) {
    return this.logger.warn(message, {
      labels: {
        module: this.module.id,
      },
    });
  }

  log(message) {
    return this.logger.log(message, {
      labels: {
        module: this.module.id,
      },
    });
  }
}
