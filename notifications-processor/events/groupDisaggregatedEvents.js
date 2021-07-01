import { Queue, Job, QueueEvents } from 'bullmq';

import {
  redis,
  groupDisaggregatedQueueName,
} from '../common/config';
import {
  PROCESSED_NOTIFICATION_STATUS,
} from '../common/constants';
import NotificationsModel from '../models/notifications';
import Logger from '../lib/winston';

const logger = new Logger(module);

const queue = new Queue(groupDisaggregatedQueueName);
const queueEvents = new QueueEvents(groupDisaggregatedQueueName, {
  connection: {
    host: redis.host,
    port: redis.port,
    connectTimeout: 30000,
    disconnectTimeout: 5000,
  },
});

queueEvents.on('active', async ({ jobId, prev }) => {
  const job = await Job.fromId(queue, jobId);
  await NotificationsModel.updateOne({ _id: job.name }, {
    'status.current': PROCESSED_NOTIFICATION_STATUS,
    'status.enqueuedAt': new Date(),
  });

  logger.info(`[${groupDisaggregatedQueueName}] job with ID ${jobId} is now active; previous status was ${prev}`);
});

export default queueEvents;
