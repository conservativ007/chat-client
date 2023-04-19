import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Size {
  sizeOfInputText: string;
  marginOfMessageContainer: string;
}

const initialState: Size = {
  sizeOfInputText: '',
  marginOfMessageContainer: '',
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
  },
});

export default sizeOfElementsSlice.reducer;
