import path from 'path';
import { Worker, QueueScheduler } from 'bullmq';

import {
  redis,
  personalizedSmsNotificationQueueName,
  smsRTPoints,
  smsRTDuration,
} from '../common/config';

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

  return worker;
};
