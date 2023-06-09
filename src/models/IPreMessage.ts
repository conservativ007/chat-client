export interface IPreMessage {
  message: string;
  senderName: string;
  receiverName: string;
  senderId: string;
  receiverId: string;
}

export const defaultPreMessage: IPreMessage = {
  message: '',
  senderName: '',
  receiverName: '',
  receiverId: '',
  senderId: '',
};
