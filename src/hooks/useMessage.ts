import { useEffect } from 'react';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { socket } from '../socket';
import { IMessage } from '../models/IMessage';

export const useMessage = () => {
  const { setPrivateMessages, setPrivateMessage } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    const handleMessageForAllChat = (message: IMessage) => {
      dispatch(setPrivateMessage(message));
    };

    const handlePrivateMessagesForClients = (data: IMessage[]) => {
      dispatch(setPrivateMessages(data));
    };

    const handlePrivateMessageForSender = (data: IMessage) => {
      dispatch(setPrivateMessage(data));
    };

    const handlePrivateMessageForResiever = (data: IMessage) => {
      // this event will only work when the resiever has selected
      // the same user that sent him a message
      if (userForPrivateMessage.login !== data.senderName) return;
      dispatch(setPrivateMessage(data));
    };

    // get one message for all chat and save it
    socket.on('messageForAllChat', handleMessageForAllChat);

    // get all private messages for sender and resiever and save it
    socket.on('privateMessagesForClients', handlePrivateMessagesForClients);

    // get one private message for sender
    socket.on('privateMessageForSender', handlePrivateMessageForSender);

    // get one private message for resiever
    socket.on('privateMessageForResiever', handlePrivateMessageForResiever);

    return () => {
      socket.off('messageForAllChat', handleMessageForAllChat);
      socket.off('privateMessagesForClients', handlePrivateMessagesForClients);
      socket.off('privateMessageForSender', handlePrivateMessageForSender);
      socket.off('privateMessageForResiever', handlePrivateMessageForResiever);
    };
  }, [userForPrivateMessage]);

  // here we are getting all the messages when we enter the general chat
  useEffect(() => {
    if (userForPrivateMessage.login === 'all') {
      socket.emit('getAllMessages', userForPrivateMessage, (val: any) => {
        dispatch(setPrivateMessages(val));
      });
    }
  }, [userForPrivateMessage]);
};
