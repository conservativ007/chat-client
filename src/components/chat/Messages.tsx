import { useEffect, useRef } from 'react';
import { socket } from '../../socket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import '../../style/messages.scss';
import { privateMessageSlice } from '../../store/reducers/PrivateMessageSlice';
import { ViewMessages } from './ViewMessages';

export const Messages = () => {
  const { setPrivateMessages, setPrivateMessage } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  let listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMessageForAllChat = (message: any) => {
      dispatch(setPrivateMessage(message));
    };

    const handlePrivateMessagesForClient = (data: any) => {
      dispatch(setPrivateMessages(data));
    };

    const handlePrivateMessageForClient = (data: any) => {
      dispatch(setPrivateMessage(data));
    };

    const handlePrivateMessageForResiever = (data: any) => {
      dispatch(setPrivateMessage(data));
    };

    // get one message for all chat and save it
    socket.on('messageForAllChat', handleMessageForAllChat);

    // get all private messages for sender and resiever and save it
    socket.on('privateMessagesForClient', handlePrivateMessagesForClient);

    // get one private message for sender
    socket.on('privateMessageForClient', handlePrivateMessageForClient);

    // get one private message for resiever
    socket.on('privateMessageForResiever', handlePrivateMessageForResiever);

    return () => {
      socket.off('messageForAllChat', handleMessageForAllChat);
      socket.off('privateMessagesForClient', handlePrivateMessagesForClient);
      socket.off('privateMessageForClient', handlePrivateMessageForClient);
      socket.off('privateMessageForResiever', handlePrivateMessageForResiever);
    };
  }, []);

  // here we are getting all the messages when we enter the free chat
  useEffect(() => {
    if (userForPrivateMessage.login === 'all') {
      socket.emit('getAllMessages', userForPrivateMessage, (val: any) => {
        dispatch(setPrivateMessages(val));
      });
    }
  }, [userForPrivateMessage]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [privateMessages]);

  return (
    <div className="chat-messages" ref={listRef}>
      <ViewMessages />
    </div>
  );
};
