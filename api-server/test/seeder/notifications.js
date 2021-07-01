import NotificationsModel from '../../models/notifications';
import {
  CREATED_NOTIFICATION_STATUS,
} from '../../common/constants';

class NotificationsSeeder {
  static async seed({
    type,
    provider,
    message,
    tag,
    userId,
  }) {
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

    return notification;
  }
}

export default NotificationsSeeder;
