import winston from 'winston';

import { environment } from '../common/config';

let level;
let silent;

switch (environment) {
  case 'production':
    level = 'info';
    silent = false;
    break;
  case 'development':
    level = 'debug';
    silent = false;
    break;
  default:
    level = 'emerg';
    silent = true;
    break;
}

const logger = winston.createLogger({
  level,
  silent,
  defaultMeta: {
    service: 'notifications-forwarder',
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

export default class Logger {
  constructor(module) {
    if (Logger.instance == null) {
      Logger.instance = this;
    }
    this.logger = logger;
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
