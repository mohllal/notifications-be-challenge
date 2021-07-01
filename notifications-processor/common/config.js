import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const environment = process.env.NODE_ENV || 'development';
export const mongodb = {
  uri:
    process.env.MONGODB_URI
    || 'mongodb://localhost:27017/notification-be',
};
export const redis = {
  host:
    process.env.REDIS_HOST
    || 'localhost',
  post:
    process.env.REDIS_PORT
    || '6379',
};
export const personalizedPushNotificationQueueName = process.env.PERSONALIZED_PUSH_NOTIFICATION_QUEUE_NAME || 'PERSONALIZED_PUSH_QUEUE';
export const groupPushNotificationQueueName = process.env.GROUP_PUSH_NOTIFICATION_QUEUE_NAME || 'GROUP_PUSH_QUEUE';
export const personalizedSmsNotificationQueueName = process.env.PERSONALIZED_SMS_NOTIFICATION_QUEUE_NAME || 'PERSONALIZED_SMS_QUEUE';
export const groupSmsNotificationQueueName = process.env.GROUP_SMS_NOTIFICATION_QUEUE_NAME || 'GROUP_SMS_QUEUE';
export const groupDisaggregatedQueueName = process.env.GROUP_DISAGGREGATED_QUEUE_NAME || 'GROUP_DISAGGREGATED_QUEUE';

const config = {
  environment,
  mongodb,
  redis,
  queues: {
    personalizedPushNotificationQueueName,
    groupPushNotificationQueueName,
    personalizedSmsNotificationQueueName,
    groupSmsNotificationQueueName,
    groupDisaggregatedQueueName,
  },
};

export default config;
