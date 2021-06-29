import {
  INTERNAL_SERVER_ERROR,
  OK,
} from 'http-status';

import {
  HEALTHCHECK__GET_HEALTHCHECK,
} from '../common/constants';
import ResponseError from '../common/errors/responseError';
import HealthcheckService from '../services/healthcheck';

export default class HealthcheckController {
  static async [HEALTHCHECK__GET_HEALTHCHECK](req, res, next) {
    try {
      const data = HealthcheckService.check();

      return res.status(OK).json({
        success: true,
        data,
      });
    } catch (error) {
      return next(
        new ResponseError(
          error.message,
          error.status || INTERNAL_SERVER_ERROR,
          error.code || 200,
        ),
      );
    }
  }
}
