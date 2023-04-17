import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/redux';

import '../../style/messages.scss';
import { ViewMessages } from './ViewMessages';
import { useSocket } from '../../hooks/useSocket';

export const Messages = () => {
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  let listRef = useRef<HTMLDivElement | null>(null);

  useSocket();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [privateMessages]);

  return (
    <div className="chat-messages" ref={listRef}>
      <ViewMessages />
    </div>
  );
};
