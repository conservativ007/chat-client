import { useEffect } from 'react';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { socket } from '../../../../socket';
import { IMessage } from '../../../../models/IMessage';
import { containerRef } from '../Messages';
import { sizeOfElementsSlice } from '../../../../store/reducers/SizeOfElements';
import { EMITS } from '../../../../constants/emits';
import { messageMenuSlice } from '../../../../store/reducers/MessaggeMenu';

export const useMessage = () => {
  const dispatch = useAppDispatch();

  const { setPrivateMessages, setPrivateMessage } = privateMessageSlice.actions;
  const { setMessagesShowingSlowly } = privateMessageSlice.actions;

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { privateMessages, isMessagesShowingSlowly } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { setSizeInputText, setMarginOfMessageContainer } =
    sizeOfElementsSlice.actions;

  const { setShowMessageMenu, setHeightOfEditableElem } =
    messageMenuSlice.actions;

  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

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

      dispatch(setSizeInputText(x));

      dispatch(setMarginOfMessageContainer(marginOfMessageContainer));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);

  useEffect(() => {
    // containerRef.current?.lastElementChild?.scrollIntoView();

    const childNodes = containerRef.current.childNodes;
    let lengthOfChildNodes = childNodes.length;
    let currentChildNode = childNodes[lengthOfChildNodes - 2];

    currentChildNode?.scrollIntoView();
  }, [privateMessages]);

  // set option which show the messages slowly
  // in the mobile layout
  useEffect(() => {
    if (sizeOfChatBody <= 600) {
      dispatch(setMessagesShowingSlowly(true));
    }

    if (sizeOfChatBody > 600) {
      dispatch(setMessagesShowingSlowly(false));
    }
  }, [sizeOfChatBody]);

  useEffect(() => {
    let elemOfMessagesContainer: HTMLDivElement = containerRef.current;
    if (isMessagesShowingSlowly === false) {
      elemOfMessagesContainer.classList.remove('messages-show-slowly');
    }

    if (userForPrivateMessage.login.length !== 0) {
      dispatch(setMessagesShowingSlowly(false));
    }
  }, [userForPrivateMessage, isMessagesShowingSlowly]);

  // close message menu if user click on menu or outside of menu
  useEffect(() => {
    const handleClickWindow = () => {
      dispatch(setShowMessageMenu(false));
    };

    window.addEventListener('click', handleClickWindow);
    return () => window.removeEventListener('click', handleClickWindow);
  }, []);
};
