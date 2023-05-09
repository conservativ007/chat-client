import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useSizeOfUsersContainer } from '../../../hooks/user/useSizeOfUsersContainer';
import { IMessage } from '../../../models/IMessage';
import { ChatForm } from '../chatForm/ChatForm';

export const ShowMessages = (): JSX.Element => {
  const { myself, userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const getSizeOfUsersContainer = useSizeOfUsersContainer();
  const [val, setVal] = useState(0);

  const getUserName = (username: string) => {
    if (userForPrivateMessage.login === 'all') {
      return (
        <span className="message-user" style={{ marginRight: '5px' }}>
          {username}:
        </span>
      );
    }
    return '';
  };

  const getDate = (date: string | undefined) => {
    if (date === undefined) return;
    let time = date.split('at')[1];
    time = time.slice(1, time.length);
    return time;
  };

  useEffect(() => {
    setVal(getSizeOfUsersContainer);
  }, [getSizeOfUsersContainer]);

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
            data-time={val > 180 ? getDate(message.createdAt) : ''}
            className={`message theme ${
              message.senderName === myself.login ? 'sender' : 'receiver'
            }`}
            style={{ paddingRight: `${val > 180 ? 10 : 40}px` }}
          >
            {getUserName(message.senderName)}
            <span className="message-text">{message.message}</span>
            <span className="message-time">
              {val <= 180 ? getDate(message.createdAt) : ''}
            </span>
          </span>
        );
      })}
      <ChatForm />
    </>
  );
};
