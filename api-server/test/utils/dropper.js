import UsersModel from '../../models/users';

class Dropper {
  static async dropUsers() {
    await UsersModel.deleteMany({});
  }
}

export default Dropper;
