import Joi from 'joi';
import {
  SUPPORTED_LANGUAGES_ISO_CODES,
} from './constants';

export default class Utils {
  static covertSupportedLanguageIsoCodesIntoJoiObj() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: Joi.string().min(1).required() }), {},
    );
  }

  static covertSupportedLanguageIsoCodesIntoMongooseObj() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: { type: String, required: true } }), {},
    );
  }

  static covertSupportedLanguageIsoCodesIntoSwaggerObj() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: { type: 'string', example: 'Hi user!', description: 'The notification message locale' } }), {},
    );
  }
}
