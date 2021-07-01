export const USERS__CREATE_USER = 'users:createUser';
export const USERS__GET_USER = 'users:getUser';
export const USERS__UPDATE_USER = 'users:updateUser';

export const USERS__ENDPOINTS = [
  USERS__CREATE_USER,
  USERS__GET_USER,
  USERS__UPDATE_USER,
];

export const HEALTHCHECK__GET_HEALTHCHECK = 'healthcheck:getHealthcheck';
export const HEALTHCHECK__ENDPOINTS = [
  HEALTHCHECK__GET_HEALTHCHECK,
];

export const ARABIC_LANGUAGE_ISO_CODE = 'ar';
export const ENGLISH_LANGUAGE_ISO_CODE = 'en';
export const SUPPORTED_LANGUAGES_ISO_CODES = [
  ARABIC_LANGUAGE_ISO_CODE,
  ENGLISH_LANGUAGE_ISO_CODE,
];

export const NOTIFICATIONS__CREATE_NOTIFICATION = 'notifications:createNotification';
export const NOTIFICATIONS__GET_NOTIFICATION = 'notifications:getNotification';
export const NOTIFICATIONS__RESEND_NOTIFICATION = 'notifications:resendNotification';

export const NOTIFICATIONS__ENDPOINTS = [
  NOTIFICATIONS__CREATE_NOTIFICATION,
  NOTIFICATIONS__GET_NOTIFICATION,
  NOTIFICATIONS__RESEND_NOTIFICATION,
];

export const GROUP_NOTIFICATION_TYPE = 'GROUP';
export const PERSONALIZED_NOTIFICATION_TYPE = 'PERSONALIZED';
export const NOTIFICATIONS_TYPES = [
  GROUP_NOTIFICATION_TYPE,
  PERSONALIZED_NOTIFICATION_TYPE,
];

export const PUSH_NOTIFICATION_PROVIDER = 'PUSH';
export const SMS_NOTIFICATION_PROVIDER = 'SMS';
export const NOTIFICATIONS_PROVIDERS = [
  PUSH_NOTIFICATION_PROVIDER,
  SMS_NOTIFICATION_PROVIDER,
];

export const CREATED_NOTIFICATION_STATUS = 'CREATED';
export const ENQUEUED_NOTIFICATION_STATUS = 'ENQUEUED';
export const PROCESSED_NOTIFICATION_STATUS = 'PROCESSED';
export const DELIVERED_NOTIFICATION_STATUS = 'DELIVERED';
export const FAILED_NOTIFICATION_STATUS = 'FAILED';
export const NOTIFICATIONS_STATUSES = [
  CREATED_NOTIFICATION_STATUS,
  ENQUEUED_NOTIFICATION_STATUS,
  PROCESSED_NOTIFICATION_STATUS,
  DELIVERED_NOTIFICATION_STATUS,
  FAILED_NOTIFICATION_STATUS,
];
