export const PORT = 4000;
// export const IP = 'http://localhost';
export const IP = 'http://85.209.148.189';

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
  SEND_IMAGE: string;
  SEND_FILE: string;
  GET_FILE: string;
}

export const CONSTANTS: IConstants = {
  SIGNUP: `${IP}:${PORT}/auth/signup`,
  LOGIN: `${IP}:${PORT}/auth/login`,
  ATTACH_SOKETID: `${IP}:${PORT}/auth/attachsocket`,
  LOGOUT_USER: `${IP}:${PORT}/auth/logout`,
  URL_CHANGE_USERNAME: `${IP}:${PORT}/users/change-username`,
  URL_CHANGE_USERPASSWORD: `${IP}:${PORT}/users/change-userpassword`,
  DELETE: `${IP}:${PORT}/auth/delete`,
  LIKE_MESSAGE: `${IP}:${PORT}/message/message-like`,
  PRIVATE_MESSAGE_EDIT: `${IP}:${PORT}/message/private-message-edit`,
  GENERAL_CHAT_MESSAGE_EDIT: `${IP}:${PORT}/message/general-chat-message-edit`,
  PRIVATE_MESSAGE_DELETE: `${IP}:${PORT}/message/private-message-delete`,
  GENERAL_CHAT_MESSAGE_DELETE: `${IP}:${PORT}/message/general-chat-message-delete`,
  CREATE_MESSAGE_FOR_GENERAL_CHAT: `${IP}:${PORT}/message/create-message-for-general-chat`,
  CREATE_PRIVATE_MESSAGE: `${IP}:${PORT}/message/create-private-message`,
  CHANGE_USER_AVATAR: `${IP}:${PORT}/file-upload/avatar`,
  SEND_IMAGE: `${IP}:${PORT}/file-upload/image`,
  SEND_FILE: `${IP}:${PORT}/file-upload/file`,
  GET_FILE: `${IP}:${PORT}/file-upload/file`,
};
