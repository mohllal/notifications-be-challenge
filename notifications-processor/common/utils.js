import {
  SUPPORTED_LANGUAGES_ISO_CODES,
  CHILD_NOTIFICATION_JOB_TYPE,
} from './constants';
import UsersModel from '../models/users';

export default class Utils {
  static covertSupportedLanguageIsoCodesIntoMongooseObj() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: { type: String, required: true } }), {},
    );
  }

  static async prepareGroupNotificationMessage(notificationMessageObj, notificationTag) {
    const users = await UsersModel.find({ nfTags: notificationTag });

    const messages = users.map((user) => ({
      message: notificationMessageObj[user.language],
      userId: user._id,
      userDeviceToken: user.nfToken,
      userPhoneNumber: user.phone,
      jobType: CHILD_NOTIFICATION_JOB_TYPE,
    }));
    return messages;
  }
}
