import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../models/IMessage';

interface PrivateMessageState {
  privateMessages: IMessage[];
}

const initialState: PrivateMessageState = {
  privateMessages: [],
};

export const privateMessageSlice = createSlice({
  name: 'privateMessage',
  initialState,
  reducers: {
    setPrivateMessages(state, action: PayloadAction<IMessage[]>) {
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
  },
});

export default privateMessageSlice.reducer;
