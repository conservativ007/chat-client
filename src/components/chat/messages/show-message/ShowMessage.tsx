import { IMessage } from '../../../../models/IMessage';

export const ShowMessage = (message: IMessage) => {
  if (message.imageSrc !== '') {
    return (
      <img src={message.imageSrc} alt="image" style={{ maxWidth: '200px' }} />
    );
  }

  return <span className="message-text">{message.message}</span>;
};
