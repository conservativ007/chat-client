import { IMessage } from '../../../../models/IMessage';

export const checkTargetUser = (
  message: IMessage,
  userForPrivateMessage: string
) => {
  // needs to return messages whgen the user
  // send message to general chat
  // and other users won't see these messages when they
  // current target not to general chat
  if (
    (message.receiverName === 'all' && userForPrivateMessage !== 'all') ||
    (message.receiverName !== 'all' && userForPrivateMessage === 'all')
  ) {
    return false;
  }
  return true;
};
