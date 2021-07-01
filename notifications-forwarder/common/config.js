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
export const personalizedSmsNotificationQueueName = process.env.PERSONALIZED_SMS_NOTIFICATION_QUEUE_NAME || 'PERSONALIZED_SMS_QUEUE';
export const
  pushNotificationRTPoints = process.env.PUSH_NOTIFICATION_PROVIDER_RATE_LIMITER_POINTS
    ? parseInt(process.env.PUSH_NOTIFICATION_PROVIDER_RATE_LIMITER_POINTS, 10)
    : 100;
export const
  pushNotificationRTDuration = process.env.PUSH_NOTIFICATION_PROVIDER_RATE_LIMITER_SECS_DURATION
    ? parseInt(process.env.PUSH_NOTIFICATION_PROVIDER_RATE_LIMITER_SECS_DURATION, 10)
    : 100;
export const
  smsRTPoints = process.env.SMS_PROVIDER_RATE_LIMITER_POINTS
    ? parseInt(process.env.SMS_PROVIDER_RATE_LIMITER_POINTS, 10)
    : 100;
export const
  smsRTDuration = process.env.SMS_PROVIDER_RATE_LIMITER_SECS_DURATION
    ? parseInt(process.env.SMS_PROVIDER_RATE_LIMITER_SECS_DURATION, 10)
    : 100;
export const fcmServiceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '/path/to/firebase/service/account';
export const fcmServiceApplicationName = process.env.FIREBASE_APPLICATION_NAME || 'fcmapp';
export const infobipAuthorizationKey = process.env.INFOBIP_AUTHORIZATION_KEY || 'infopipauthorizationkey';
export const infobipApplicationName = process.env.INFOBIP_APPLICATION_NAME || 'infobipapp';
export const pushProviderIntegrationToggle = process.env.PUSH_PROVIDER_INTEGRATION_TOGGLE
  ? String(process.env.PUSH_PROVIDER_INTEGRATION_TOGGLE) === 'true'
  : false;
export const smsProviderIntegrationToggle = process.env.SMS_PROVIDER_INTEGRATION_TOGGLE
  ? String(process.env.SMS_PROVIDER_INTEGRATION_TOGGLE) === 'true'
  : false;

const config = {
  environment,
  mongodb,
  redis,
  queues: {
    personalizedPushNotificationQueueName,
    personalizedSmsNotificationQueueName,
  },
  pushRateLimiter: {
    pushNotificationRTPoints,
    pushNotificationRTDuration,
  },
  smsRateLimiter: {
    smsRTPoints,
    smsRTDuration,
  },
  fcm: {
    fcmServiceAccountPath,
    fcmServiceApplicationName,
  },
  infobip: {
    infobipAuthorizationKey,
    infobipApplicationName,
  },
  integration: {
    pushProviderIntegrationToggle,
    smsProviderIntegrationToggle,
  },
};

export default config;
