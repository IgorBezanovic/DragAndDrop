import { User } from "../types/user.model";

export class ListUsers {
  public listUsers: User[];

  constructor(listUsers: User[]) {
    this.listUsers = listUsers;
  }

  public addUser(user: User) {
    this.listUsers.push(user);
  }

  public removeUser(userId: string) {
    this.listUsers = this.listUsers.filter((item) => item.id !== userId);
  }
}
