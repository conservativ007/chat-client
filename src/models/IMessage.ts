export interface IMessage {
  id: number;
  senderName: string;
  receiverName: string;
  message: string;
  messageStatus: boolean;
  createdAt: string;
}
