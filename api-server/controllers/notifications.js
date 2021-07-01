import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from 'http-status';

import {
  NOTIFICATIONS__CREATE_NOTIFICATION,
  NOTIFICATIONS__GET_NOTIFICATION,
  NOTIFICATIONS__RESEND_NOTIFICATION,
} from '../common/constants';
import ResponseError from '../common/errors/responseError';
import NotificationsService from '../services/notifications';

export default class NotificationsController {
  static async [NOTIFICATIONS__CREATE_NOTIFICATION](req, res, next) {
    try {
      const {
        type,
        provider,
        message,
        tag,
        userId,
      } = req.body;

      const data = await NotificationsService.create(type, provider, message, tag, userId);

      return res.status(CREATED).json({
        success: true,
        data,
      });
    } catch (error) {
      return next(
        new ResponseError(
          error.message,
          error.status || INTERNAL_SERVER_ERROR,
          error.code || 100,
        ),
      );
    }
  }

  static async [NOTIFICATIONS__GET_NOTIFICATION](req, res, next) {
    try {
      const {
        id,
      } = req.params;

      const data = await NotificationsService.get(id);

      return res.status(OK).json({
        success: true,
        data,
      });
    } catch (error) {
      return next(
        new ResponseError(
          error.message,
          error.status || INTERNAL_SERVER_ERROR,
          error.code || 100,
        ),
      );
    }
  }

  static async [NOTIFICATIONS__RESEND_NOTIFICATION](req, res, next) {
    try {
      const {
        id,
      } = req.params;

      const data = await NotificationsService.resend(id);

      return res.status(OK).json({
        success: true,
        data,
      });
    } catch (error) {
      return next(
        new ResponseError(
          error.message,
          error.status || INTERNAL_SERVER_ERROR,
          error.code || 100,
        ),
      );
    }
  }
}
