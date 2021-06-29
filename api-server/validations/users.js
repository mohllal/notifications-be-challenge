import Joi from 'joi';
import {
  USERS__CREATE_USER,
  USERS__GET_USER,
  USERS__UPDATE_USER,
  SUPPORTED_LANGUAGES_ISO_CODES,
} from '../common/constants';

export default class UsersValidationSchemas {
  static [USERS__CREATE_USER] = {
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        phone: Joi.string().min(1).required(),
        name: Joi.string().min(1).required(),
        language: Joi.string().min(1).valid(...SUPPORTED_LANGUAGES_ISO_CODES).required(),
        nfTags: Joi.array().min(1).items(Joi.string()).optional(),
      })
      .required(),
  };

  static [USERS__GET_USER] = {
    params: Joi.object()
      .keys({
        id: Joi.string().min(1).required(),
      })
      .required(),
  };

  static [USERS__UPDATE_USER] = {
    params: Joi.object()
      .keys({
        id: Joi.string().min(1).required(),
      })
      .required(),
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        phone: Joi.string().min(1).required(),
        name: Joi.string().min(1).optional(),
        language: Joi.string().min(1).valid(...SUPPORTED_LANGUAGES_ISO_CODES).optional(),
        nfTags: Joi.array().items(Joi.string()).optional(),
      })
      .or(
        'email',
        'phone',
        'name',
        'language',
        'notificationTags',
      )
      .required(),
  };
}
