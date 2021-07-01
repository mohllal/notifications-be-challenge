import {
  smsProviderIntegrationToggle,
} from '../common/config';

import Infobip from '../lib/infobip';
import SmsX from '../lib/smsX';
import Logger from '../lib/winston';

const logger = new Logger(module);

export default class PushNotificationHandler {
  constructor() {
    this.providerToggle = smsProviderIntegrationToggle;
    this.provider = this.providerToggle ? new Infobip() : new SmsX();
  }

  async send(message, phone) {
    logger.info(`Sending personalized sms with provider toggle: ${this.providerToggle} and provider ${this.provider.constructor.name}`);

    return this.provider.sendSms(message, phone);
  }
}
