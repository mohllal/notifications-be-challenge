import Logger from './winston';

const logger = new Logger(module);

class PushY {
  async sendNotification(message, token) {
    logger.info(`Sending push notification with message: ${message} to token: ${token} using ${this.constructor.name} provider`);

    return Promise.resolve();
  }
}

export default PushY;
