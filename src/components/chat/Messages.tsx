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

  const { userNameForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  let listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageHandler = (message: any) => {
      dispatch(setPrivateMessage(message));
    };

    const handlePrivateMessagesForClient = (data: any) => {
      // console.log('handlePrivateMessagesForClient');
      // console.log(data);
      dispatch(setPrivateMessages(data));
    };

    const handlePrivateMessageForClient = (data: any) => {
      // console.log('handlePrivateMessageForClient');
      // console.log(data);
      dispatch(setPrivateMessage(data));
    };

    socket.on('message', messageHandler);
    socket.on('privateMessagesForClient', handlePrivateMessagesForClient);
    socket.on('privateMessageForClient', handlePrivateMessageForClient);

    return () => {
      socket.off('message', messageHandler);
      socket.off('privateMessagesForClient', handlePrivateMessagesForClient);
      socket.off('privateMessageForClient', handlePrivateMessageForClient);
    };
  }, []);

  useEffect(() => {
    if (userNameForPrivateMessage === 'all') {
      socket.emit('getAllMessages', userNameForPrivateMessage, (val: any) => {
        // console.log('val');
        // console.log(val);
        dispatch(setPrivateMessages(val));
      });
    }
  }, [userNameForPrivateMessage]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [privateMessages]);

  return (
    <div className="chat-messages" ref={listRef}>
      <ViewMessages />
    </div>
  );
};
