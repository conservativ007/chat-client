import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IMessage } from '../../../models/IMessage';
import { ChatForm } from '../chat-form/ChatForm';

import { Like } from './like-button/Like';
import { Time } from './show-time-in-message/Time';

import './messages.scss';
import { messageMenuSlice } from '../../../store/reducers/MessaggeMenu';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';

export const ShowMessages = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { myself, userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { sizeOfMessageContainer, sizeOfUsersContainer } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { setShowMessageMenu, setLeft, setTop } = messageMenuSlice.actions;

  const { setMessageWichEdit } = privateMessageSlice.actions;

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

  // new feature!
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    message: IMessage
  ) => {
    e.preventDefault();

    const sizeOfMessageEditor = 120;

    let sizeOne = sizeOfMessageEditor + e.clientX - sizeOfUsersContainer;
    let sizeTwo = sizeOfMessageContainer - sizeOne;

    let result = 0;

    if (sizeTwo < 0) {
      result = e.clientX + sizeTwo;
      dispatch(setLeft(result));
    } else {
      dispatch(setLeft(e.clientX));
    }

    if (message.senderId !== myself.id) return;

    // set message clicked
    dispatch(setMessageWichEdit(message));

    // show menu in message
    dispatch(setShowMessageMenu(true));
    dispatch(setTop(e.clientY));
  };

  useEffect(() => {
    const handleClickWindow = () => {
      dispatch(setShowMessageMenu(false));
    };

    window.addEventListener('click', handleClickWindow);
    return () => window.removeEventListener('click', handleClickWindow);
  }, []);

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
            onContextMenu={(e) => handleContextMenu(e, message)}
            // data-time={val > 180 ? getDate(message.createdAt) : ''}
            className={`message theme ${
              message.senderId === myself.id ? 'sender' : 'receiver'
            }`}
            style={{ paddingRight: `${50}px` }}
            // style={{ paddingRight: `${val > 180 ? 10 : 50}px` }}
          >
            {getUserName(message.senderName)}
            <span className="message-text">{message.message}</span>
            <Time
              getDate={getDate}
              index={index}
              message={message}
              key={index}
            />
            <Like message={message} />
          </div>
        );
      })}
      <ChatForm />
    </>
  );
};
