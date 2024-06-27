import { IUserModel, UserModel } from "../3-models/user-model";

class UserService {
  public async getAllUsers(): Promise<IUserModel[]> {
    const users = await UserModel.find().exec();
    return users;
  }

  public async getUserById(_id: string): Promise<IUserModel> {
    const user = await UserModel.findById(_id);
    return user;
  }
}

export const userService = new UserService();
