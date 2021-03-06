import SmsNotificationHandler from '../handlers/smsNotificationHandler';
import Logger from '../lib/winston';

const handler = new SmsNotificationHandler();
const logger = new Logger(module);

export default async (job) => {
  const {
    id,
    data,
    timestamp,
  } = job;

  logger.info(`An sms personalized notification job with ID ${id} is now processing at ${new Date(timestamp).toISOString()}`);

  const { message, userPhoneNumber } = data;
  await handler.send(message, userPhoneNumber);
};
