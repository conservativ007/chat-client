import { useAppSelector } from '../../hooks/redux';

export const ViewMessages = () => {
  const { name } = useAppSelector((state) => state.userReducer);
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  return (
    <>
      {privateMessages.map((message: any, index: number) => {
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
