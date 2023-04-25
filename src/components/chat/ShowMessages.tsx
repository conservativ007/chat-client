import { useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/IMessage';
import { ChatForm } from './ChatForm';

export const ShowMessages = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <>
      {privateMessages.map((message: IMessage) => {
        // needs to return messages whgen the user
        // send message to general chat
        // and other users won't see these messages when they
        // current target not to general chat
        if (
          (message.receiverName === 'all' &&
            userForPrivateMessage.login !== 'all') ||
          (message.receiverName !== 'all' &&
            userForPrivateMessage.login === 'all')
        ) {
          return;
        }

        return (
          <span
            key={message.id}
            className={`message ${
              message.senderName === myself.login ? 'right' : 'left'
            }`}
          >
            <span className="message-user">{message.senderName}</span>
            <span className="message-text">{message.message}</span>
          </span>
        );
      })}

      <ChatForm />
    </>
  );
};
