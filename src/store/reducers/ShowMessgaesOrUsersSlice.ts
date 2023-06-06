import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IShowMessgaesOrUsersState {
  showMessages: boolean | null;
}

const initialState: IShowMessgaesOrUsersState = {
  showMessages: null,
};

export const showMessgaesOrUsersSlice = createSlice({
  name: 'showMessgaesOrUsersInMobileLayout',
  initialState,
  reducers: {
    setShowMessages(state, action: PayloadAction<boolean>) {
      state.showMessages = action.payload;
    },
    setShowMessagesToNull(state, action: PayloadAction<null>) {
      state.showMessages = action.payload;
    },
  },
});

export default showMessgaesOrUsersSlice.reducer;
