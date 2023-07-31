import axios from 'axios';
import { CONSTANTS, EMITS } from '../../../../constants';
import { IMessage } from '../../../../models/IMessage';
import { socket } from '../../../../socket';

export const deleteMessageForGeneralChat = (
  message: IMessage,
  token: string
) => {
  axios
    .delete(`${CONSTANTS.GENERAL_CHAT_MESSAGE_DELETE}/${message.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status !== 204) return;
      socket.emit(EMITS.DELETE_MESSAGE_FOR_GENERAL_CHAT, message.id);
    })
    .catch((err) => {
      console.error(err);
    });
};
