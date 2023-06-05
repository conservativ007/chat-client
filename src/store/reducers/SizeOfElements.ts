import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Size {
  sizeOfInputText: number;
  marginOfMessageContainer: number;
  sizeOfMessageContainer: number;
  sizeOfUsersContainer: number;
  sizeOfChatBody: number;
}

const initialState: Size = {
  sizeOfInputText: 0,
  marginOfMessageContainer: 0,
  sizeOfMessageContainer: 0,
  sizeOfUsersContainer: 0,
  sizeOfChatBody: 0,
};

export const sizeOfElementsSlice = createSlice({
  name: 'sizeOfElements',
  initialState,
  reducers: {
    setSizeInputText(state, action: PayloadAction<number>) {
      state.sizeOfInputText = action.payload;
    },
    setMarginOfMessageContainer(state, action: PayloadAction<number>) {
      state.marginOfMessageContainer = action.payload;
    },
    setSizeOfMessageContainer(state, action: PayloadAction<number>) {
      state.sizeOfMessageContainer = action.payload;
    },
    setSizeOfUsersContainer(state, action: PayloadAction<number>) {
      state.sizeOfUsersContainer = action.payload;
    },
    setSizeOfChatBody(state, action: PayloadAction<number>) {
      state.sizeOfChatBody = action.payload;
    },
  },
});

export default sizeOfElementsSlice.reducer;
