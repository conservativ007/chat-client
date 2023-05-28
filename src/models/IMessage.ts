export interface IMessage {
  id: string;
  createdAt: string;
  senderName: string;
  receiverName: string;
  senderId: string;
  receiverId: string;
  message: string;
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
};
