import {
  INTERNAL_SERVER_ERROR,
} from 'http-status';

import ResponseError from '../common/errors/responseError';

function format(time) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default class HealthcheckService {
  static check() {
    try {
      return {
        time: new Date(),
        up: format(process.uptime()),
      };
    } catch (error) {
      throw new ResponseError(
        `Error in healthcheck service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 200,
      );
    }
  }
}
