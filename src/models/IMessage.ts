export interface IMessage {
  id: string;
  createdAt?: string;
  senderName: string;
  receiverName: string;
  message: string;
  likeCount: number;
  whoLiked: string[];
}
