const PORT = 4000;

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
  SIGNUP: `http://localhost:${PORT}/auth/signup`,
  LOGIN: `http://localhost:${PORT}/auth/login`,
  ATTACH_SOKETID: `http://localhost:${PORT}/auth/attachsocket`,
  LOGOUT_USER: `http://localhost:${PORT}/auth/logout`,
  URL_CHANGE_USERNAME: `http://localhost:${PORT}/users/change-username`,
  URL_CHANGE_USERPASSWORD: `http://localhost:${PORT}/users/change-userpassword`,
  DELETE: `http://localhost:${PORT}/auth/delete`,
  LIKE_MESSAGE: `http://localhost:${PORT}/message/message-like`,
  PRIVATE_MESSAGE_EDIT: `http://localhost:${PORT}/message/private-message-edit`,
  GENERAL_CHAT_MESSAGE_EDIT: `http://localhost:${PORT}/message/general-chat-message-edit`,
  PRIVATE_MESSAGE_DELETE: `http://localhost:${PORT}/message/private-message-delete`,
  GENERAL_CHAT_MESSAGE_DELETE: `http://localhost:${PORT}/message/general-chat-message-delete`,
  CREATE_MESSAGE_FOR_GENERAL_CHAT: `http://localhost:${PORT}/message/create-message-for-general-chat`,
  CREATE_PRIVATE_MESSAGE: `http://localhost:${PORT}/message/create-private-message`,
  CHANGE_USER_AVATAR: `http://localhost:${PORT}/file-upload`,
};
