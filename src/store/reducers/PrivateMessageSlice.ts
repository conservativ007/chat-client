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
  },
});

export default privateMessageSlice.reducer;
