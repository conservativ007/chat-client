import { useAppSelector } from '../../../../hooks/redux';
import { IMessage } from '../../../../models/IMessage';
import { bytesToMegabytes } from '../../send-file-menu/helpers/bytesToMegabytes';
import { downloadFile } from '../helpers/downloadFile';
import './index.scss';

export const ShowMessage = (message: IMessage) => {
  const { token } = useAppSelector((state) => state.userReducer);

  const handleClick = () => {
    downloadFile(message.fileId, message.fileName, token);
  };

  if (message.imageSrc !== '') {
    return (
      <img src={message.imageSrc} alt="image" style={{ maxWidth: '200px' }} />
    );
  }

  if (message.fileId !== 0) {
    return (
      <div className="message-file">
        <div className="file-container corner" onClick={handleClick}>
          <p>{message.fileName.split('.')[1]}</p>
        </div>
        <div className="message-file__describe">
          <p>{message.fileName}</p>
          <p>{bytesToMegabytes(message.fileSize)} mb</p>
        </div>
      </div>
    );
  }

  return <span className="message-text">{message.message}</span>;
};
