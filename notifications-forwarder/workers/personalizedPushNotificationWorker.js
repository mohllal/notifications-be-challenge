import path from 'path';
import { Worker, QueueScheduler } from 'bullmq';

import {
  redis,
  personalizedPushNotificationQueueName,
  pushNotificationRTPoints,
  pushNotificationRTDuration,
} from '../common/config';

export const scheduler = new QueueScheduler(personalizedPushNotificationQueueName);

export default (processor) => {
  const processorFile = path.join(__dirname, processor);

  const worker = new Worker(personalizedPushNotificationQueueName, processorFile, {
    connection: {
      host: redis.host,
      port: redis.port,
      connectTimeout: 30000,
      disconnectTimeout: 5000,
    },
    limiter: {
      max: pushNotificationRTPoints,
      duration: pushNotificationRTDuration * 1000,
    },
  });

  return worker;
};
