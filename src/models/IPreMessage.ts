export interface IPreMessage {
  message: string;
  senderName: string;
  receiverName: string;
  senderId: string;
  receiverId: string;
  imageSrc: string;
  fileId: number;
  fileName: string;
  fileSize: number;
}

export const defaultPreMessage: IPreMessage = {
  message: '',
  senderName: '',
  receiverName: '',
  receiverId: '',
  senderId: '',
  imageSrc: '',
  fileId: 0,
  fileName: '',
  fileSize: 0,
};
