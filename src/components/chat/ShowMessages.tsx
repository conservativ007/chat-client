import { useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/IMessage';

export const ShowMessages = (): JSX.Element => {
  const { name } = useAppSelector((state) => state.userReducer);
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <>
      {privateMessages.map((message: IMessage) => {
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
              message.senderName === name ? 'right' : 'left'
            }`}
          >
            <span className="message-user">{message.senderName}</span>
            <span className="message-text">{message.message}</span>
          </span>
        );
      })}
    </>
  );
};
