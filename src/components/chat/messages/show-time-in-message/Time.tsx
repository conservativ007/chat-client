import * as React from 'react';
import { IMessage } from '../../../../models/IMessage';

export interface IAppProps {
  index: number;
  getDate: (date: string | undefined) => string | undefined;
  message: IMessage;
  val: number;
}

export const Time = ({ index, getDate, message, val }: IAppProps) => {
  return (
    <span key={index} className="message-time">
      {val <= 180 ? getDate(message.createdAt) : ''}
    </span>
  );
};
