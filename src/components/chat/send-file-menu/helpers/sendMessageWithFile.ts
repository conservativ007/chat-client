import { IPreMessage } from '../../../../models/IPreMessage';
import { sendMessage } from '../../helpers/sendMessage';

export const sendMessageWithFile = async (
  message: IPreMessage,
  token: string
) => {
  let newMessage: IPreMessage = {
    ...message,
  };

  let response = await sendMessage(newMessage.receiverName, token, newMessage);

  return response;
};
