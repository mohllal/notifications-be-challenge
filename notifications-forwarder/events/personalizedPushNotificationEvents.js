import { Queue, Job, QueueEvents } from 'bullmq';

import {
  redis,
  personalizedPushNotificationQueueName,
} from '../common/config';
import {
  ENQUEUED_NOTIFICATION_STATUS,
  DELIVERED_NOTIFICATION_STATUS,
  FAILED_NOTIFICATION_STATUS,
} from '../common/constants';
import NotificationsModel from '../models/notifications';
import Logger from '../lib/winston';

const logger = new Logger(module);

const queue = new Queue(personalizedPushNotificationQueueName);
const queueEvents = new QueueEvents(personalizedPushNotificationQueueName, {
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

  logger.info(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', async ({ jobId, prev }) => {
  logger.info(`Job with ID ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', async ({ jobId, returnvalue }) => {
  const job = await Job.fromId(queue, jobId);

  await NotificationsModel.updateOne({ _id: job.name }, {
    'status.current': DELIVERED_NOTIFICATION_STATUS,
    'status.deliveredAt': new Date(),
  });

  logger.info(`Job with ID ${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', async ({ jobId, failedReason }) => {
  const job = await Job.fromId(queue, jobId);

  await NotificationsModel.updateOne({ _id: job.name }, {
    'status.current': FAILED_NOTIFICATION_STATUS,
    'status.failedAt': new Date(),
  });

  logger.info(`Job with ID ${jobId} has failed with reason ${failedReason}`);
});

export default queueEvents;
