import { IPreMessage } from '../../../../models/IPreMessage';
import { sendMessage } from '../../helpers/sendMessage';

export const sendEmptyMessage = async (prop: IPreMessage, token: string) => {
  let newMessage: IPreMessage = {
    ...prop,
  };

  let response = await sendMessage(newMessage.receiverName, token, newMessage);

  return response;
};
