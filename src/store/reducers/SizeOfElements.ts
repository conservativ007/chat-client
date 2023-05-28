import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Size {
  sizeOfInputText: string;
  marginOfMessageContainer: string;
  sizeOfMessageContainer: number;
  sizeOfUsersContainer: number;
}

const initialState: Size = {
  sizeOfInputText: '',
  marginOfMessageContainer: '',
  sizeOfMessageContainer: 0,
  sizeOfUsersContainer: 0,
};

export const sizeOfElementsSlice = createSlice({
  name: 'sizeOfElements',
  initialState,
  reducers: {
    setSizeInputText(state, action: PayloadAction<string>) {
      state.sizeOfInputText = action.payload;
    },
    setMarginOfMessageContainer(state, action: PayloadAction<string>) {
      state.marginOfMessageContainer = action.payload;
    },
    setSizeOfMessageContainer(state, action: PayloadAction<number>) {
      state.sizeOfMessageContainer = action.payload;
    },
    setSizeOfUsersContainer(state, action: PayloadAction<number>) {
      state.sizeOfUsersContainer = action.payload;
    },
  },
});

export default sizeOfElementsSlice.reducer;
