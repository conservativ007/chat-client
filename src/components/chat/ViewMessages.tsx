import { useAppSelector } from '../../hooks/redux';

export const ViewMessages = () => {
  const { name } = useAppSelector((state) => state.userReducer);
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <>
      {privateMessages.map((message: any, index: number) => {
        console.log(message);

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
            key={index}
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
