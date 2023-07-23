import axios from 'axios';
import { CONSTANTS, EMITS } from '../../../constants';
import { IPreMessage } from '../../../models/IPreMessage';
import { socket } from '../../../socket';

export const sendMessage = (
  userForPrivateMessage: string,
  token: string,
  message: IPreMessage
) => {
  let url: string;
  let emit: string;

  if (userForPrivateMessage === 'all') {
    url = CONSTANTS.CREATE_MESSAGE_FOR_GENERAL_CHAT;
    emit = EMITS.CREATE_MESSAGE_FOR_GENERAL_CHAT;
  } else {
    url = CONSTANTS.CREATE_PRIVATE_MESSAGE;
    emit = EMITS.CREATE_PRIVATE_MESSAGE;
  }

  let response = axios
    .post(url, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status !== 201) return;
      socket.emit(emit, response.data);

      return response;
    })
    .catch((err) => console.error(err));

  return response;
};
