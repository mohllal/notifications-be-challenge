import faker from 'faker';
import { nanoid } from 'nanoid';

import {
  NOTIFICATIONS_TYPES,
  NOTIFICATIONS_PROVIDERS,
  SUPPORTED_LANGUAGES_ISO_CODES,
} from '../../common/constants';

export default class Random {
  static getRadomLanguage() {
    const index = Math.floor(Math.random() * SUPPORTED_LANGUAGES_ISO_CODES.length);

    return SUPPORTED_LANGUAGES_ISO_CODES[index];
  }

  static getRadomNotificationType() {
    const index = Math.floor(Math.random() * NOTIFICATIONS_TYPES.length);

    return NOTIFICATIONS_TYPES[index];
  }

  static getRadomNotificationProvider() {
    const index = Math.floor(Math.random() * NOTIFICATIONS_PROVIDERS.length);

    return NOTIFICATIONS_PROVIDERS[index];
  }

  static getRadomNotificationMessage() {
    return SUPPORTED_LANGUAGES_ISO_CODES.reduce(
      (ac, a) => ({ ...ac, [a]: faker.lorem.word() }), {},
    );
  }

  static getRandomNotificationTag() {
    return nanoid(10);
  }
}
