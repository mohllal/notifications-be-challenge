import faker from 'faker';
import { nanoid } from 'nanoid';

import {
  ENGLISH_LANGUAGE_ISO_CODE,
} from '../../common/constants';

class UsersFactory {
  static generate() {
    return {
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      language: ENGLISH_LANGUAGE_ISO_CODE,
      nfTags: [nanoid()],
    };
  }
}

export default UsersFactory;
