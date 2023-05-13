import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useSizeOfUsersContainer } from '../../../hooks/user/useSizeOfUsersContainer';
import { IMessage } from '../../../models/IMessage';
import { ChatForm } from '../chat-form/ChatForm';

import { Like } from './like-button/Like';
import { Time } from './show-time-in-message/Time';
import { MessageEditor } from './message-editor/MessageEditor';

import './messages.scss';

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
    let time = date.slice(-5);
    return time;
  };

  useEffect(() => {
    setVal(getSizeOfUsersContainer);
  }, [getSizeOfUsersContainer]);

  return (
    <>
      {privateMessages.map((message: IMessage, index: number) => {
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
          <div
            key={message.id}
            data-time={val > 180 ? getDate(message.createdAt) : ''}
            className={`message theme ${
              message.senderName === myself.login ? 'sender' : 'receiver'
            }`}
            style={{ paddingRight: `${val > 180 ? 10 : 50}px` }}
          >
            {getUserName(message.senderName)}
            <span className="message-text">{message.message}</span>
            <Time
              getDate={getDate}
              index={index}
              message={message}
              val={val}
              key={index}
            />
            <Like message={message} />
            <MessageEditor message={message} />
          </div>
        );
      })}
      <ChatForm />
    </>
  );
};
