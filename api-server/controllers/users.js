import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from 'http-status';

import {
  USERS__CREATE_USER,
  USERS__GET_USER,
  USERS__UPDATE_USER,
} from '../common/constants';
import ResponseError from '../common/errors/responseError';
import UsersService from '../services/users';

export default class UsersController {
  static async [USERS__CREATE_USER](req, res, next) {
    try {
      const {
        email,
        phone,
        name,
        language,
        nfTags,
      } = req.body;

      const data = await UsersService.create(email, phone, name, language, nfTags);

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

  static async [USERS__GET_USER](req, res, next) {
    try {
      const {
        id,
      } = req.params;

      const data = await UsersService.get(id);

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

  static async [USERS__UPDATE_USER](req, res, next) {
    try {
      const {
        id,
      } = req.params;

      const {
        email,
        phone,
        name,
        language,
        nfTags,
      } = req.body;

      const data = await UsersService.update(id, {
        email,
        phone,
        name,
        language,
        nfTags,
      });

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
