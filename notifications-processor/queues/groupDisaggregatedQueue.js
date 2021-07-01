import { FlowProducer } from 'bullmq';
import {
  redis,
} from '../common/config';

const groupDisaggregatedFlowProducer = new FlowProducer({
  connection: {
    host: redis.host,
    port: redis.port,
    connectTimeout: 30000,
    disconnectTimeout: 5000,
  },
});

export default groupDisaggregatedFlowProducer;
