export interface IMessage {
  id?: string;
  createdAt?: string;
  senderName: string;
  receiverName: string;
  message: string;
}
