interface IConstants {
  SIGNUP: string;
  LOGIN: string;
  ATTACH_SOKETID: string;
  LOGOUT_USER: string;
  URL_CHANGE_USERNAME: string;
  URL_CHANGE_USERPASSWORD: string;
}

export const CONSTANTS: IConstants = {
  SIGNUP: 'http://localhost:3001/auth/signup',
  LOGIN: 'http://localhost:3001/auth/login',
  ATTACH_SOKETID: 'http://localhost:3001/auth/attachsocket',
  LOGOUT_USER: 'http://localhost:3001/auth/logout',
  URL_CHANGE_USERNAME: 'http://localhost:3001/users/change-username',
  URL_CHANGE_USERPASSWORD: 'http://localhost:3001/users/change-userpassword',
};