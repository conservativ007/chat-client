export interface IPreMessage {
  message: string;
  senderName: string;
  receiverName: string;
}

export const defaultPreMessage: IPreMessage = {
  message: '',
  senderName: '',
  receiverName: '',
};
