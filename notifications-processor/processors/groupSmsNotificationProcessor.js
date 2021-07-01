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

  logger.info(`An sms group notification job with ID ${id} is now processing at ${new Date(timestamp).toISOString()}`);

  const { notificationId, notificationMessageObj, notificationTag } = data;
  await handler.send(notificationId, notificationMessageObj, notificationTag);
};
