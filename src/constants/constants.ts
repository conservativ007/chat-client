interface IConstants {
  signup: string;
  login: string;
  attach_socketid: string;
}

export const CONSTANTS: IConstants = {
  signup: 'http://localhost:3001/auth/signup',
  login: 'http://localhost:3001/auth/login',
  attach_socketid: 'http://localhost:3001/auth/attachsocket',
};
