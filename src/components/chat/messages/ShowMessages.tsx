import { useAppSelector } from '../../../hooks/redux';
import { IMessage } from '../../../models/IMessage';
import { ChatForm } from '../chat-form/chat-form/ChatForm';

import { Like } from './like-button/Like';
import { Time } from './show-time-in-message/Time';

import './messages.scss';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';
import { checkTargetUser } from './helpers/checkTargetUser';
import { ShowUserName } from './show-username/ShowUserName';
import { ShowMessage } from './show-message/ShowMessage';

export const ShowMessages = (): JSX.Element => {
  const getUseHandleContextMenu = useHandleContextMenu();

  const { myself, userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const stylesForTextMessages = {
    backgroundImage: `linear-gradient(to bottom, #d4a241, #ef4b42, #8b599e)`,
  };
  const stylesForFileMessages = {
    backgroundColor: `#212121`,
  };

  return (
    <>
      {privateMessages.map((message: IMessage) => {
        if (checkTargetUser(message, userForPrivateMessage.login) === false)
          return;

        return (
          <div
            key={message.id}
            onContextMenu={(e) => getUseHandleContextMenu(e, message)}
            className={`message theme ${
              message.senderId === myself.id ? 'sender' : 'receiver'
            }`}
            style={
              message.fileId !== 0
                ? stylesForFileMessages
                : stylesForTextMessages
            }
          >
            <ShowUserName username={message.senderName} />
            <ShowMessage {...message} />
            <Time message={message} key={message.id} />
            <Like message={message} />
          </div>
        );
      })}
      <ChatForm />
    </>
  );
};
