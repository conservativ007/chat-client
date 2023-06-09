import * as React from 'react';
import { IMessage } from '../../../../models/IMessage';

export interface IAppProps {
  message: IMessage;
}

export const Time = ({ message }: IAppProps) => {
  const getDate = (date: string | undefined) => {
    if (date === undefined) return;
    let time = date.slice(-5);
    return time;
  };

  return (
    <span key={message.id} className="message-time">
      {getDate(message.createdAt)}
    </span>
  );
};
