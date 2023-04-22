import { useRef } from 'react';

import '../../style/messages.scss';
import { ShowMessages } from './ShowMessages';
import { useMessage } from '../../hooks/useMessage';

export let containerRef: any;

export const Messages = (): JSX.Element => {
  containerRef = useRef<HTMLDivElement | null>(null);
  useMessage();

  return (
    <div className="chat-messages">
      <div className="bg"></div>
      <div className="messages-container" ref={containerRef}>
        <ShowMessages />
      </div>
    </div>
  );
};
