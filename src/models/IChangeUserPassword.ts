export interface IChangeUserPassword {
  type: string;
  url: string;
  userId: string;
  oldPassword: string;
  newPassword: string;
}
