import { useEffect } from 'react';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { socket } from '../socket';
import { IMessage } from '../models/IMessage';
import { containerRef } from '../components/chat/Messages';
import { sizeOfElementsSlice } from '../store/reducers/SizeOfElements';

export const useMessage = () => {
  const { setPrivateMessages, setPrivateMessage } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { setSizeInputText, setMarginOfMessageContainer } =
    sizeOfElementsSlice.actions;

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

  useEffect(() => {
    let messageContainer = containerRef.current;

    const handleResize = () => {
      const widthOfInputText = String(
        messageContainer?.getBoundingClientRect().width
      );

      let marginOfMessageContainer =
        messageContainer?.getBoundingClientRect().x;
      marginOfMessageContainer += 10;

      let x = Number(widthOfInputText) - 5;

      dispatch(setSizeInputText(String(x)));

      dispatch(setMarginOfMessageContainer(marginOfMessageContainer));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // containerRef.current?.lastElementChild?.scrollIntoView();

    const childNodes = containerRef.current.childNodes;
    let lengthOfChildNodes = childNodes.length;
    let currentChildNode = childNodes[lengthOfChildNodes - 2];

    currentChildNode?.scrollIntoView();
  }, [privateMessages]);
};
