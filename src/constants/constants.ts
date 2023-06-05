export const PORT = 4000;
// export const IP = 'localhost';
export const IP = '85.209.148.189';

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
  CREATE_MESSAGE_FOR_GENERAL_CHAT: string;
  CREATE_PRIVATE_MESSAGE: string;
  CHANGE_USER_AVATAR: string;
}

export const CONSTANTS: IConstants = {
  SIGNUP: `http://${IP}:${PORT}/auth/signup`,
  LOGIN: `http://${IP}:${PORT}/auth/login`,
  ATTACH_SOKETID: `http://${IP}:${PORT}/auth/attachsocket`,
  LOGOUT_USER: `http://${IP}:${PORT}/auth/logout`,
  URL_CHANGE_USERNAME: `http://${IP}:${PORT}/users/change-username`,
  URL_CHANGE_USERPASSWORD: `http://${IP}:${PORT}/users/change-userpassword`,
  DELETE: `http://${IP}:${PORT}/auth/delete`,
  LIKE_MESSAGE: `http://${IP}:${PORT}/message/message-like`,
  PRIVATE_MESSAGE_EDIT: `http://${IP}:${PORT}/message/private-message-edit`,
  GENERAL_CHAT_MESSAGE_EDIT: `http://${IP}:${PORT}/message/general-chat-message-edit`,
  PRIVATE_MESSAGE_DELETE: `http://${IP}:${PORT}/message/private-message-delete`,
  GENERAL_CHAT_MESSAGE_DELETE: `http://${IP}:${PORT}/message/general-chat-message-delete`,
  CREATE_MESSAGE_FOR_GENERAL_CHAT: `http://${IP}:${PORT}/message/create-message-for-general-chat`,
  CREATE_PRIVATE_MESSAGE: `http://${IP}:${PORT}/message/create-private-message`,
  CHANGE_USER_AVATAR: `http://${IP}:${PORT}/file-upload`,
};
