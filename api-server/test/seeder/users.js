import {
  ENGLISH_LANGUAGE_ISO_CODE,
} from '../../common/constants';
import UsersModel from '../../models/users';

class UsersSeeder {
  static async seed({
    email,
    phone,
    name,
    language = ENGLISH_LANGUAGE_ISO_CODE,
    nfTags = [],
  }) {
    const user = await UsersModel.create({
      email,
      phone,
      name,
      language,
      nfTags,
    });

    return user;
  }
}

export default UsersSeeder;
