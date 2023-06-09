import { useAppSelector } from '../../../hooks/redux';
import { IMessage } from '../../../models/IMessage';
import { ChatForm } from '../chat-form/ChatForm';

import { Like } from './like-button/Like';
import { Time } from './show-time-in-message/Time';

import './messages.scss';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';

export const ShowMessages = (): JSX.Element => {
  const getUseHandleContextMenu = useHandleContextMenu();

  const { myself, userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

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

  const checkTargetUser = (message: IMessage) => {
    // needs to return messages whgen the user
    // send message to general chat
    // and other users won't see these messages when they
    // current target not to general chat
    if (
      (message.receiverName === 'all' &&
        userForPrivateMessage.login !== 'all') ||
      (message.receiverName !== 'all' && userForPrivateMessage.login === 'all')
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      {privateMessages.map((message: IMessage) => {
        if (checkTargetUser(message) === false) return;

        return (
          <div
            key={message.id}
            onContextMenu={(e) => getUseHandleContextMenu(e, message)}
            className={`message theme ${
              message.senderId === myself.id ? 'sender' : 'receiver'
            }`}
            style={{ paddingRight: `${50}px` }}
          >
            {getUserName(message.senderName)}
            <span className="message-text">{message.message}</span>
            <Time message={message} key={message.id} />
            <Like message={message} />
          </div>
        );
      })}
      <ChatForm />
    </>
  );
};
