import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from 'http-status';

import {
  PUSH_NOTIFICATION_PROVIDER,
  SMS_NOTIFICATION_PROVIDER,
  PERSONALIZED_NOTIFICATION_TYPE,
  GROUP_NOTIFICATION_TYPE,
  CREATED_NOTIFICATION_STATUS,
  DIRECT_NOTIFICATION_JOB_TYPE,
} from '../common/constants';

import GroupPushNotificationQueue from '../queues/groupPushNotificationQueue';
import PersonalizedPushNotificationQueue from '../queues/personalizedPushNotificationQueue';
import GroupSmsNotificationQueue from '../queues/groupSmsNotificationQueue';
import PersonalizedSmsNotificationQueue from '../queues/personalizedSmsNotificationQueue';

import NotificationsModel from '../models/notifications';
import UsersModel from '../models/users';
import ResponseError from '../common/errors/responseError';
import Logger from '../lib/winston';

const logger = new Logger(module);

export default class NotificationsService {
  static async create(type, provider, message, tag, userId) {
    try {
      let user;
      if (type === PERSONALIZED_NOTIFICATION_TYPE) {
        user = await UsersModel.findOne({ _id: userId });

        if (!user) {
          throw new ResponseError(
            'No user found with the provided id',
            NOT_FOUND,
            300,
          );
        }
      }

      const notification = await NotificationsModel.create({
        type,
        provider,
        message,
        tag,
        userId,
        status: {
          current: CREATED_NOTIFICATION_STATUS,
          createdAt: new Date(),
        },
      });

      if (notification.type === PERSONALIZED_NOTIFICATION_TYPE) {
        await NotificationsService.enqueuePersonalizedNotification({
          provider: notification.provider,
          notificationId: notification._id,
          notificationMessageObj: notification.message,
          userId: user._id,
          userLanguage: user.language,
          userDeviceToken: user.nfToken,
          userPhoneNumber: user.phone,
        });
      } else if (notification.type === GROUP_NOTIFICATION_TYPE) {
        await NotificationsService.enqueueGroupNotification({
          provider: notification.provider,
          notificationId: notification._id,
          notificationMessageObj: notification.message,
          notificationTag: notification.tag,
        });
      }

      return notification;
    } catch (error) {
      throw new ResponseError(
        `Error in notifications create service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 300,
      );
    }
  }

  static async get(id) {
    try {
      const notification = await NotificationsModel.findOne({ _id: id });

      if (!notification) {
        throw new ResponseError(
          'No notification found with the provided id',
          NOT_FOUND,
          3000,
        );
      }

      return notification;
    } catch (error) {
      throw new ResponseError(
        `Error in notifications get service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 3000,
      );
    }
  }

  static async resend(id) {
    try {
      const notification = await NotificationsModel.findOne({ _id: id });

      if (!notification) {
        throw new ResponseError(
          'No notification found with the provided id',
          NOT_FOUND,
          3000,
        );
      }

      const newNotification = await NotificationsModel.create({
        type: notification.type,
        provider: notification.provider,
        message: notification.message,
        tag: notification.tag,
        userId: notification.userId,
        status: {
          current: CREATED_NOTIFICATION_STATUS,
          createdAt: new Date(),
        },
      });

      if (newNotification.type === PERSONALIZED_NOTIFICATION_TYPE) {
        const user = await UsersModel.findOne({ _id: newNotification.userId });

        await NotificationsService.enqueuePersonalizedNotification({
          provider: newNotification.provider,
          notificationId: newNotification._id,
          notificationMessageObj: newNotification.message,
          userId: user._id,
          userLanguage: user.language,
          userDeviceToken: user.nfToken,
          userPhoneNumber: user.phone,
        });
      } else if (newNotification.type === GROUP_NOTIFICATION_TYPE) {
        await NotificationsService.enqueueGroupNotification({
          provider: newNotification.provider,
          notificationId: newNotification._id,
          notificationMessageObj: newNotification.message,
          notificationTag: newNotification.tag,
        });
      }

      return newNotification;
    } catch (error) {
      throw new ResponseError(
        `Error in notifications resend service: ${error.message}`,
        error.status || INTERNAL_SERVER_ERROR,
        error.code || 3000,
      );
    }
  }

  static async enqueuePersonalizedNotification({
    provider,
    notificationId,
    notificationMessageObj,
    userId,
    userLanguage,
    userDeviceToken,
    userPhoneNumber,
  }) {
    try {
      const message = notificationMessageObj[userLanguage];

      const payload = {
        notificationId,
        message,
        userId,
        userDeviceToken,
        userPhoneNumber,
        jobType: DIRECT_NOTIFICATION_JOB_TYPE,
      };

      switch (provider) {
        case PUSH_NOTIFICATION_PROVIDER:
          await PersonalizedPushNotificationQueue.add(notificationId, payload);
          break;
        case SMS_NOTIFICATION_PROVIDER:
          await PersonalizedSmsNotificationQueue.add(notificationId, payload);
          break;
        default:
          break;
      }
    } catch (error) {
      logger.error(`Error in enqueue personalized notification service: ${error.message}`);
      throw error;
    }
  }

  static async enqueueGroupNotification({
    provider,
    notificationId,
    notificationMessageObj,
    notificationTag,
  }) {
    try {
      const payload = {
        notificationId,
        notificationMessageObj,
        notificationTag,
      };

      switch (provider) {
        case PUSH_NOTIFICATION_PROVIDER:
          await GroupPushNotificationQueue.add(notificationId, payload);
          break;
        case SMS_NOTIFICATION_PROVIDER:
          await GroupSmsNotificationQueue.add(notificationId, payload);
          break;
        default:
          break;
      }
    } catch (error) {
      logger.error(`Error in enqueue group notification service: ${error.message}`);
      throw error;
    }
  }
}
