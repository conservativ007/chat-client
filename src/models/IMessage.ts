import { IPreMessage } from './IPreMessage';

export interface IMessage extends IPreMessage {
  id: string;
  createdAt: string;
  likeCount: number;
  whoLiked: string[];
  createdDateForSort: number;
}

export const defaultMessage: IMessage = {
  id: '',
  createdAt: '',
  senderName: '',
  receiverName: '',
  message: '',
  likeCount: 0,
  whoLiked: [''],
  createdDateForSort: 0,
  senderId: '',
  receiverId: '',
  imageSrc: '',
  fileId: 0,
  fileName: '',
  fileSize: 0,
};
