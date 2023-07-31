import axios from 'axios';
import { CONSTANTS, EMITS } from '../../../../constants';
import { IMessage } from '../../../../models/IMessage';
import { IUser } from '../../../../models/IUser';
import { socket } from '../../../../socket';

export const deleteMessageForOneUser = async (
  message: IMessage,
  userForPrivateMessage: IUser,
  token: string
) => {
  axios
    .delete(`${CONSTANTS.PRIVATE_MESSAGE_DELETE}/${message.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status !== 204) return;

      // delete for reciever user
      const data = {
        recieverId: userForPrivateMessage.id,
        messageId: message.id,
      };
      socket.emit(EMITS.DELETE_PRIVATE_MESSAGE, data);
    })
    .catch((err) => {
      console.error(err);
    });
};
