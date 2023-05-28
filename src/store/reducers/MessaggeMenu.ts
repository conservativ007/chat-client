import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MessageMenuState {
  showMessageMenu: boolean;
  left: number;
  top: number;
}

const initialState: MessageMenuState = {
  showMessageMenu: false,
  left: 0,
  top: 0,
};

export const messageMenuSlice = createSlice({
  name: 'showMessage',
  initialState,
  reducers: {
    setShowMessageMenu(state, action: PayloadAction<boolean>) {
      state.showMessageMenu = action.payload;
    },
    setLeft(state, action: PayloadAction<number>) {
      state.left = action.payload;
    },
    setTop(state, action: PayloadAction<number>) {
      state.top = action.payload;
    },
  },
});

export default messageMenuSlice.reducer;
