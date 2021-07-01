import {
  pushProviderIntegrationToggle,
} from '../common/config';

import FCM from '../lib/fcm';
import PushY from '../lib/pushY';
import Logger from '../lib/winston';

const logger = new Logger(module);

export default class PushNotificationHandler {
  constructor() {
    this.providerToggle = pushProviderIntegrationToggle;
    this.provider = this.providerToggle ? new FCM() : new PushY();
  }

  async send(message, token) {
    logger.info(`Sending push notification with provider toggle: ${this.providerToggle} and provider ${this.provider.constructor.name}`);

    return this.provider.sendNotification(message, token);
  }
}
