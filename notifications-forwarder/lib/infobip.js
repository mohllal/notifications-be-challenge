import axios from 'axios';

import {
  infobipAuthorizationKey,
  infobipApplicationName,
} from '../common/config';
import Logger from './winston';

const logger = new Logger(module);

class Infobip {
  constructor() {
    this.applicationName = infobipApplicationName;
    this.authorizationKey = infobipAuthorizationKey;
  }

  async sendSms(message, phone) {
    try {
      logger.info(`Sending sms with message: ${message} to phone: ${phone} using Infobip provider`);
      return await axios({
        method: 'POST',
        url: process.env.INFOBIP_URL,
        headers: {
          'content-Type': 'application/json',
          accept: 'application/json',
          authorization: this.authorizationKey,
        },
        data: {
          from: this.applicationName,
          to: phone,
          text: message,
        },
      });
    } catch (error) {
      logger.error(`Error in Infobip send service: ${error.message}`);
      throw error;
    }
  }
}

export default Infobip;
