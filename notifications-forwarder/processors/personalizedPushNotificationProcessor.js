import PushNotificationHandler from '../handlers/pushNotificationHandler';
import Logger from '../lib/winston';

const handler = new PushNotificationHandler();
const logger = new Logger(module);

export default async (job) => {
  const {
    id,
    data,
    timestamp,
  } = job;

  logger.info(`A push personalized notification job with ID ${id} is now processing at ${new Date(timestamp).toISOString()}`);

  const { message, userDeviceToken } = data;
  await handler.send(message, userDeviceToken);
};
