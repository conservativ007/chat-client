import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/redux';

import '../../style/messages.scss';
import { ShowMessages } from './ShowMessages';
import { useMessage } from '../../hooks/useMessage';

export const Messages = (): JSX.Element => {
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  let listRef = useRef<HTMLDivElement | null>(null);

  useMessage();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [privateMessages]);

  return (
    <div className="chat-messages" ref={listRef}>
      <ShowMessages />
    </div>
  );
};
