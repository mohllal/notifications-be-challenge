import Randomer from '../utils/randomer';
import UsersModel from '../../models/users';

class UsersSeeder {
  static async seed({
    email,
    phone,
    name,
    language = Randomer.getRadomLanguage(),
    nfTags = [Randomer.getRandomNotificationTag()],
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
