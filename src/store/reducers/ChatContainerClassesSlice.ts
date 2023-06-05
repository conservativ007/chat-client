import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatContainerClassesState {
  classForChatContainer: 'mobile-show-users' | 'mobile-hide-users' | '';
}

const initialState: ChatContainerClassesState = {
  classForChatContainer: '',
};

export const ChatContainerClassesSlice = createSlice({
  name: 'privateMessage',
  initialState,
  reducers: {
    setClassForChatContainer(
      state,
      action: PayloadAction<'mobile-show-users' | 'mobile-hide-users' | ''>
    ) {
      state.classForChatContainer = action.payload;
    },
  },
});

export default ChatContainerClassesSlice.reducer;
