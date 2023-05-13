export interface IMessage {
  id: string;
  createdAt: string;
  senderName: string;
  receiverName: string;
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
};
