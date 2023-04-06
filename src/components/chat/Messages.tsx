import { useEffect, useState } from 'react';
import { socket } from '../../socket';

export const Messages = () => {
  const [messagesTwo, setMessagesTwo] = useState<any>([]);

  useEffect(() => {
    const messageTwo = (message: any) => {
      setMessagesTwo((prev: any) => [...prev, message]);
    };
    socket.on('messageTwo', messageTwo);

    return () => {
      socket.off('messageTwo', messageTwo);
    };
  }, []);

  return (
    <div className="messages">
      {messagesTwo?.map((message: any, index: number) => {
        return (
          <div key={index}>
            {message.login} - {message.text}
          </div>
        );
      })}
    </div>
  );
};
