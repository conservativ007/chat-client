import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage, defaultMessage } from '../../models/IMessage';
import { IPreMessage, defaultPreMessage } from '../../models/IPreMessage';

interface PrivateMessageState {
  privateMessages: IMessage[];
  editMessage: IMessage;
  preMessage: IPreMessage;
  isMessageEdit: boolean;
}

const initialState: PrivateMessageState = {
  privateMessages: [],
  isMessageEdit: false,
  editMessage: defaultMessage,
  preMessage: defaultPreMessage,
};

export const privateMessageSlice = createSlice({
  name: 'privateMessage',
  initialState,
  reducers: {
    setPrivateMessages(state, action: PayloadAction<IMessage[]>) {
      action.payload.sort((a: IMessage, b: IMessage): number => {
        if (a.createdDateForSort > b.createdDateForSort) return 1;
        if (a.createdDateForSort < b.createdDateForSort) return -1;
        return 0;
      });
      state.privateMessages = action.payload;
    },
    setPrivateMessage(state, action: PayloadAction<IMessage>) {
      state.privateMessages.push(action.payload);
    },

    updateMessage(state, action: PayloadAction<IMessage>) {
      const recievedMessage: IMessage = action.payload;
      let foundIndexMessage = state.privateMessages.findIndex(
        (message) => message.id === recievedMessage.id
      );

      if (foundIndexMessage === -1) {
        console.log('foundIndexMessage === -1');
        return;
      }

      state.privateMessages.splice(foundIndexMessage, 1, recievedMessage);
    },
    setMessageActionEdit(state, action: PayloadAction<boolean>) {
      state.isMessageEdit = action.payload;
    },
    setMessageWichEdit(state, action: PayloadAction<IMessage>) {
      state.editMessage = action.payload;
    },
    setPreMessage(state, action: PayloadAction<IPreMessage>) {
      state.preMessage = action.payload;
    },

    deleteMessage(state, action: PayloadAction<string>) {
      const foundIndex = state.privateMessages.findIndex(
        (message) => message.id === action.payload
      );

      if (foundIndex === -1) {
        console.log('foundIndex === -1');
        return;
      }

      state.privateMessages.splice(foundIndex, 1);
    },
  },
});

export default privateMessageSlice.reducer;
