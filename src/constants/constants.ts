interface IConstants {
  SIGNUP: string;
  LOGIN: string;
  ATTACH_SOKETID: string;
  LOGOUT_USER: string;
  URL_CHANGE_USERNAME: string;
  URL_CHANGE_USERPASSWORD: string;
  DELETE: string;
  LIKE_MESSAGE: string;
  PRIVATE_MESSAGE_EDIT: string;
  GENERAL_CHAT_MESSAGE_EDIT: string;
  PRIVATE_MESSAGE_DELETE: string;
  GENERAL_CHAT_MESSAGE_DELETE: string;
}

export const CONSTANTS: IConstants = {
  SIGNUP: 'http://localhost:3001/auth/signup',
  LOGIN: 'http://localhost:3001/auth/login',
  ATTACH_SOKETID: 'http://localhost:3001/auth/attachsocket',
  LOGOUT_USER: 'http://localhost:3001/auth/logout',
  URL_CHANGE_USERNAME: 'http://localhost:3001/users/change-username',
  URL_CHANGE_USERPASSWORD: 'http://localhost:3001/users/change-userpassword',
  DELETE: 'http://localhost:3001/auth/delete',
  LIKE_MESSAGE: 'http://localhost:3001/message/message-like',
  PRIVATE_MESSAGE_EDIT: 'http://localhost:3001/message/private-message-edit',
  GENERAL_CHAT_MESSAGE_EDIT:
    'http://localhost:3001/message/general-chat-message-edit',
  PRIVATE_MESSAGE_DELETE:
    'http://localhost:3001/message/private-message-delete',
  GENERAL_CHAT_MESSAGE_DELETE:
    'http://localhost:3001/message/general-chat-message-delete',
};
