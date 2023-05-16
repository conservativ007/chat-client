import { useEffect } from 'react';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { socket } from '../socket';
import { IMessage } from '../models/IMessage';
import { containerRef } from '../components/chat/messages/Messages';
import { sizeOfElementsSlice } from '../store/reducers/SizeOfElements';
import { EMITS } from '../constants/emits';

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
    const handlePrivateMessagesForClients = (data: IMessage[]) => {
      dispatch(setPrivateMessages(data));
    };

    const handleMessageForAllChat = (message: IMessage) => {
      dispatch(setPrivateMessage(message));
    };

    const handlePrivateMessageForResiever = (message: IMessage) => {
      dispatch(setPrivateMessage(message));
    };

    // get one message for all chat and save it
    socket.on(EMITS.CREATE_MESSAGE_FOR_GENERAL_CHAT, handleMessageForAllChat);

    // get all private messages for sender and resiever and save it
    socket.on(
      EMITS.GET_MESSAGES_FOR_PRIVATE_CHAT,
      handlePrivateMessagesForClients
    );

    socket.on(EMITS.CREATE_PRIVATE_MESSAGE, handlePrivateMessageForResiever);

    return () => {
      socket.off(
        EMITS.GET_MESSAGES_FOR_PRIVATE_CHAT,
        handlePrivateMessagesForClients
      );
      socket.off(EMITS.CREATE_PRIVATE_MESSAGE, handlePrivateMessageForResiever);
      socket.off(
        EMITS.CREATE_MESSAGE_FOR_GENERAL_CHAT,
        handleMessageForAllChat
      );
    };
  }, [userForPrivateMessage]);

  // here we are getting all the messages when we enter the general chat
  useEffect(() => {
    if (userForPrivateMessage.login === 'all') {
      socket.emit(
        EMITS.GET_MESSAGES_FOR_GENERAL_CHAT,
        userForPrivateMessage,
        (response: IMessage[]) => {
          dispatch(setPrivateMessages(response));
        }
      );
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
