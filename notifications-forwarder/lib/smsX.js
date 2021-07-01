import Logger from './winston';

const logger = new Logger(module);

class SmsX {
  async sendSms(message, phone) {
    logger.info(`Sending sms with message: ${message} to phone: ${phone} using ${this.constructor.name} provider`);

    return Promise.resolve();
  }
}

export default SmsX;
