import { useEffect, useRef } from 'react';

import '../../style/messages.scss';
import { ShowMessages } from './ShowMessages';
import { useMessage } from '../../hooks/useMessage';
import { useAppDispatch } from '../../hooks/redux';
import { sizeOfElementsSlice } from '../../store/reducers/SizeOfElements';

export let containerRef: any;

export const Messages = (): JSX.Element => {
  containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const { setSizeInputText } = sizeOfElementsSlice.actions;

  useMessage();

  useEffect(() => {
    let elem = containerRef.current;
    let widthOfMessagesContainer = elem.getBoundingClientRect().width;
    dispatch(setSizeInputText(widthOfMessagesContainer));
  }, []);

  return (
    <div className="chat-messages">
      <div className="bg"></div>
      <div className="messages-container" ref={containerRef}>
        <ShowMessages />
      </div>
    </div>
  );
};
