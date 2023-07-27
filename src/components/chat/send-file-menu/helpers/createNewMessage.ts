import { IPreMessage } from '../../../../models/IPreMessage';
import { IUser } from '../../../../models/IUser';
import { UploadFileResponse } from './uploadFile';
import { UploadImageResponse } from './uploadImage';

export const createNewMessage = (
  userForPrivateMessage: IUser,
  myself: IUser,
  responseType: UploadFileResponse | UploadImageResponse | undefined,
  selectedFile: File
) => {
  if (responseType === undefined) {
    console.error('type === undefined');
    return;
  }

  let newMessage: IPreMessage = {
    receiverId: userForPrivateMessage.id,
    receiverName: userForPrivateMessage.login,
    senderId: myself.id,
    senderName: myself.login,
    message: '',
    fileId: 0,
    imageSrc: '',
    fileName: '',
    fileSize: selectedFile.size,
  };

  if (responseType.type === 'file') {
    newMessage.fileId = responseType.fileId;
    newMessage.fileName = responseType.fileName;
  }
  if (responseType.type === 'image')
    newMessage.imageSrc = responseType.imageUrl;

  return newMessage;
};
