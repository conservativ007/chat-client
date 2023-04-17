import { useEffect } from 'react';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { socket } from '../socket';

export const useSocket = () => {
  const { setPrivateMessages, setPrivateMessage } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

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

  // here we are getting all the messages when we enter the general chat
  useEffect(() => {
    if (userForPrivateMessage.login === 'all') {
      socket.emit('getAllMessages', userForPrivateMessage, (val: any) => {
        dispatch(setPrivateMessages(val));
      });
    }
  }, [userForPrivateMessage]);
};
