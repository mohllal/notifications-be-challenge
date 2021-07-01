import { Queue, Job, QueueEvents } from 'bullmq';

import {
  redis,
  groupPushNotificationQueueName,
} from '../common/config';
import {
  ENQUEUED_NOTIFICATION_STATUS,
} from '../common/constants';
import NotificationsModel from '../models/notifications';
import Logger from '../lib/winston';

const logger = new Logger(module);

const queue = new Queue(groupPushNotificationQueueName);
const queueEvents = new QueueEvents(groupPushNotificationQueueName, {
  connection: {
    host: redis.host,
    port: redis.port,
    connectTimeout: 30000,
    disconnectTimeout: 5000,
  },
});

queueEvents.on('waiting', async ({ jobId }) => {
  const job = await Job.fromId(queue, jobId);

  await NotificationsModel.updateOne({ _id: job.name }, {
    'status.current': ENQUEUED_NOTIFICATION_STATUS,
    'status.enqueuedAt': new Date(),
  });

  logger.info(`[${groupPushNotificationQueueName}] job with ID ${jobId} is waiting`);
});

queueEvents.on('active', async ({ jobId, prev }) => {
  logger.info(`[${groupPushNotificationQueueName}] job with ID ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', async ({ jobId, returnvalue }) => {
  logger.info(`[${groupPushNotificationQueueName}] job with ID ${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', async ({ jobId, failedReason }) => {
  logger.info(`[${groupPushNotificationQueueName}] job with ID ${jobId} has failed with reason ${failedReason}`);
});

export default queueEvents;
