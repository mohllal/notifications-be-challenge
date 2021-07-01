import Randomer from '../utils/randomer';

class NotificationsFactory {
  static generateGroupNotification() {
    return {
      type: Randomer.getRadomNotificationType(),
      provider: Randomer.getRadomNotificationProvider(),
      message: Randomer.getRadomNotificationMessage(),
      tag: Randomer.getRandomNotificationTag(),
    };
  }

  static generatePersonalizedNotification(userId) {
    return {
      type: Randomer.getRadomNotificationType(),
      provider: Randomer.getRadomNotificationProvider(),
      message: Randomer.getRadomNotificationMessage(),
      userId,
    };
  }
}

export default NotificationsFactory;
