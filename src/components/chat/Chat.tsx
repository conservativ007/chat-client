import { Messages } from './messages/Messages';
import { Users } from './users/Users';
import { Header } from './header/Header';
import { MessageMenu } from './message-menu/MessageMenu';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sizeOfElementsSlice } from '../../store/reducers/SizeOfElements';
import { ChatContainerClassesSlice } from '../../store/reducers/ChatContainerClassesSlice';

export const Chat = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { setSizeOfChatBody } = sizeOfElementsSlice.actions;
  const { setClassForChatContainer } = ChatContainerClassesSlice.actions;

  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { classForChatContainer } = useAppSelector(
    (state) => state.chatContainerClassesReducer
  );

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    const handleResize = () => {
      let elemOfDivRef = divRef.current;
      let withOfElem = elemOfDivRef?.getBoundingClientRect().width;

      if (withOfElem === undefined) return;
      dispatch(setSizeOfChatBody(withOfElem));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sizeOfChatBody < 600 && userForPrivateMessage.login === '') {
      dispatch(setClassForChatContainer('mobile-show-users'));
    } else if (sizeOfChatBody < 600 && userForPrivateMessage.login !== '') {
      dispatch(setClassForChatContainer('mobile-hide-users'));
    } else if (sizeOfChatBody > 600) {
      dispatch(setClassForChatContainer(''));
    }
  }, [sizeOfChatBody, userForPrivateMessage]);

  return (
    <div ref={divRef} className={`chat-container ${classForChatContainer}`}>
      <Header />
      <div className="chat-body">
        <Users />
        <Messages />
        <MessageMenu />
      </div>
    </div>
  );
};
