import { Messages } from '../messages/Messages';
import { Users } from '.././users/Users';
import { Header } from '../header/Header';
import { MessageMenu } from '../message-menu/MessageMenu';
import { useRef } from 'react';

import { useChat } from './hooks/useChat';

import './chat.scss';
import './chat-animation.scss';
import { SendFileMenu } from '../send-file-menu/SendFileMenu';

export const Chat = (): JSX.Element => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useChat(chatContainerRef);

  return (
    <div ref={chatContainerRef} className="chat-container">
      <Header />
      <div className="chat-body">
        <div className="chat-body__container">
          <Users />
          <Messages />
          <MessageMenu />
          <SendFileMenu />
        </div>
      </div>
    </div>
  );
};
