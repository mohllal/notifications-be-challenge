import UsersModel from '../../models/users';
import NotificationsModel from '../../models/notifications';

class Dropper {
  static async dropUsers() {
    await UsersModel.deleteMany({});
  }

  static async dropNotifications() {
    await NotificationsModel.deleteMany({});
  }
}

export default Dropper;
