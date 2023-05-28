import * as React from 'react';
import { IMessage } from '../../../../models/IMessage';

export interface IAppProps {
  index: number;
  getDate: (date: string | undefined) => string | undefined;
  message: IMessage;
}

export const Time = ({ index, getDate, message }: IAppProps) => {
  return (
    <span key={index} className="message-time">
      {getDate(message.createdAt)}
    </span>
  );
};
