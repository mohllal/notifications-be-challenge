import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from 'http-status';

import UsersModel from '../models/users';
import ResponseError from '../common/errors/responseError';

export default class UsersService {
  static async create(email, phone, name, language, nfTags) {
    try {
      const user = await UsersModel.findOne({
        $or: [{ email }, { phone }],
      });

      if (user) {
        throw new ResponseError(
          'Another user with the same email or phone already exists',
          CONFLICT,
          100,
        );
      }

      return UsersModel.create({
        email,
        phone,
        name,
        language,
        nfTags,
      });
    } catch (error) {
      throw new ResponseError(
        `Error in users create service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 100,
      );
    }
  }

  static async get(id) {
    try {
      const user = await UsersModel.findOne({ _id: id });

      if (!user) {
        throw new ResponseError(
          'No user found with the provided id',
          NOT_FOUND,
          100,
        );
      }

      return user;
    } catch (error) {
      throw new ResponseError(
        `Error in users get service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 100,
      );
    }
  }

  static async update(id, {
    email,
    phone,
    name,
    language,
    nfTags,
  }) {
    try {
      let user = await UsersModel.findOne({ _id: id });
      if (!user) {
        throw new ResponseError(
          'No user found with the provided id',
          NOT_FOUND,
          100,
        );
      }

      user = await UsersModel.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: id },
      });

      if (user) {
        throw new ResponseError(
          'Another user with the same email or phone already exists',
          CONFLICT,
          100,
        );
      }

      return UsersModel.findOneAndUpdate({ _id: id }, {
        $set: {
          ...(email ? { email } : {}),
          ...(phone ? { phone } : {}),
          ...(name ? { name } : {}),
          ...(language ? { language } : {}),
          ...(nfTags ? { nfTags } : {}),
        },
      }, { new: true });
    } catch (error) {
      throw new ResponseError(
        `Error in users update service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 100,
      );
    }
  }
}
