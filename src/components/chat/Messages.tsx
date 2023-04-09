import { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { useAppSelector } from '../../hooks/redux';

import '../../style/messages.scss';

export const Messages = () => {
  const [messagesTwo, setMessagesTwo] = useState<any>([]);
  const { name } = useAppSelector((state) => state.userReducer);

  let listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageTwo = (message: any) => {
      setMessagesTwo((prev: any) => [...prev, message]);
    };
    socket.on('messageTwo', messageTwo);

    return () => {
      socket.off('messageTwo', messageTwo);
    };
  }, []);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesTwo]);

  return (
    <div className="chat-messages" ref={listRef}>
      {messagesTwo?.map((message: any, index: number) => {
        return (
          <span
            key={index}
            className={`message ${message.login === name ? 'right' : 'left'}`}
          >
            <span className="message-user">{message.login}</span>
            <span className="message-text">{message.text}</span>
          </span>
        );
      })}
    </div>
  );
};
