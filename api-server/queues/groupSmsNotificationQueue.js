import { Queue } from 'bullmq';
import {
  redis,
  groupSmsNotificationQueueName,
} from '../common/config';

const GroupSmsNotificationQueue = new Queue(groupSmsNotificationQueueName, {
  connection: {
    host: redis.host,
    port: redis.port,
    connectTimeout: 30000,
    disconnectTimeout: 5000,
  },
  defaultJobOptions: {
    attempts: 10,
    backoff: {
      /**
       * With an exponential backoff, it will retry after 2 ^ attempts * delay milliseconds.
       * @see {@link https://docs.bullmq.io/guide/retrying-failing-jobs}
       * */
      type: 'exponential',
      delay: 1000,
    },
  },
});

export default GroupSmsNotificationQueue;
