import {
  GROUP_NOTIFICATION_TYPE,
  PERSONALIZED_NOTIFICATION_TYPE,
} from '../../common/constants';
import Randomer from '../utils/randomer';

class NotificationsFactory {
  static generateGroupNotification() {
    return {
      type: GROUP_NOTIFICATION_TYPE,
      provider: Randomer.getRadomNotificationProvider(),
      message: Randomer.getRadomNotificationMessage(),
      tag: Randomer.getRandomNotificationTag(),
    };
  }

  static generatePersonalizedNotification(userId) {
    return {
      type: PERSONALIZED_NOTIFICATION_TYPE,
      provider: Randomer.getRadomNotificationProvider(),
      message: Randomer.getRadomNotificationMessage(),
      userId,
    };
  }
}

export default NotificationsFactory;
