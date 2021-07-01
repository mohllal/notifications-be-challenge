import path from 'path';
import { Worker, QueueScheduler } from 'bullmq';

import {
  redis,
  personalizedSmsNotificationQueueName,
  smsRTPoints,
  smsRTDuration,
} from '../common/config';
import Logger from '../lib/winston';

const logger = new Logger(module);

export const scheduler = new QueueScheduler(personalizedSmsNotificationQueueName);

export default (processor) => {
  const processorFile = path.join(__dirname, processor);

  const worker = new Worker(personalizedSmsNotificationQueueName, processorFile, {
    connection: {
      host: redis.host,
      port: redis.port,
      connectTimeout: 30000,
      disconnectTimeout: 5000,
    },
    limiter: {
      max: smsRTPoints,
      duration: smsRTDuration * 1000,
    },
  });

  worker.on('error', (error) => {
    logger.error(`[${personalizedSmsNotificationQueueName}] worker error: ${error.message}`);
  });

  return worker;
};
