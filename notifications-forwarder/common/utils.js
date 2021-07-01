import {
  SUPPORTED_LANGUAGES_ISO_CODES,
} from './constants';

export default class Utils {
  static covertSupportedLanguageIsoCodesIntoMongooseObj() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: { type: String, required: true } }), {},
    );
  }
}
