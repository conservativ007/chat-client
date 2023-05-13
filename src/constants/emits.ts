interface IEmits {
  UPDATE_MESSAGE_FOR_ONE_USER: string;
  UPDATE_MESSAGE_FOR_GENERAL_CHAT: string;
  UPDATE_MESSAGE: string;
}

export const EMITS: IEmits = {
  UPDATE_MESSAGE_FOR_ONE_USER: 'update-message-for-one-user',
  UPDATE_MESSAGE_FOR_GENERAL_CHAT: 'update-message-for-general-chat',
  UPDATE_MESSAGE: 'update-message',
};
