import mongoose from 'mongoose';

import { mongodb } from '../common/config';
import Logger from './winston';

const logger = new Logger(module);

const client = mongoose.connect(mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 360000,
  socketTimeoutMS: 360000,
}, (error) => {
  if (error) {
    logger.error(`Connecting to MongoDB server error ${error.message}`);
  } else {
    logger.info('Connected successfully to MongoDB server');
  }
});

export default client;
