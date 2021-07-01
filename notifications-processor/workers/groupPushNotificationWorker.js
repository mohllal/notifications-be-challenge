import path from 'path';
import { Worker, QueueScheduler } from 'bullmq';

import {
  redis,
  groupPushNotificationQueueName,
} from '../common/config';
import Logger from '../lib/winston';

const logger = new Logger(module);

export const scheduler = new QueueScheduler(groupPushNotificationQueueName);

export default (processor) => {
  const processorFile = path.join(__dirname, processor);

  const worker = new Worker(groupPushNotificationQueueName, processorFile, {
    connection: {
      host: redis.host,
      port: redis.port,
      connectTimeout: 30000,
      disconnectTimeout: 5000,
    },
    concurrency: 10,
  });

  worker.on('error', (error) => {
    logger.error(`[${groupPushNotificationQueueName}] worker error: ${error.message}`);
  });

  return worker;
};
