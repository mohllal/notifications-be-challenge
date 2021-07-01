import faker from 'faker';

import Randomer from '../utils/randomer';

class UsersFactory {
  static generate() {
    return {
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      language: Randomer.getRadomLanguage(),
      nfTags: [Randomer.getRandomNotificationTag()],
    };
  }
}

export default UsersFactory;
