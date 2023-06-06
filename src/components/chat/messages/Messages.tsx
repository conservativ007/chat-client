import { useEffect, useRef } from 'react';

import './messages.scss';
import { ShowMessages } from './ShowMessages';
import { useMessage } from '../../../hooks/useMessage';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { sizeOfElementsSlice } from '../../../store/reducers/SizeOfElements';
import React from 'react';

export let containerRef: any;

export const Messages = (): JSX.Element => {
  containerRef = useRef<HTMLDivElement | null>(null);

  let chatMessagesContainerRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { setSizeInputText, setSizeOfMessageContainer } =
    sizeOfElementsSlice.actions;

  useEffect(() => {
    const resizeListener = () => {
      const elemChatMessages = chatMessagesContainerRef.current;
      let elemPosition = elemChatMessages?.getBoundingClientRect();

      if (elemPosition === undefined) return;
      dispatch(setSizeOfMessageContainer(elemPosition.width));
      // console.log(elemPosition);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  useEffect(() => {
    const elemChatMessages = chatMessagesContainerRef.current;
    let elemPosition = elemChatMessages?.getBoundingClientRect();

    if (elemPosition === undefined) return;
    dispatch(setSizeOfMessageContainer(elemPosition.width));

    const elem = containerRef.current;
    let widthOfMessagesContainer = elem.getBoundingClientRect().width;
    dispatch(setSizeInputText(widthOfMessagesContainer));

    // console.log(elemPosition.width);
  }, [chatMessagesContainerRef, containerRef, userForPrivateMessage]);

  useMessage();

  return (
    <div className="chat-messages" ref={chatMessagesContainerRef}>
      <div className="bg"></div>
      <div className="messages-container" ref={containerRef}>
        <ShowMessages />
      </div>
    </div>
  );
};
