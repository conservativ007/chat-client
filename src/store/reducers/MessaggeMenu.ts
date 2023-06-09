import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MessageMenuState {
  showMessageMenu: boolean;
  showEditableMessage: boolean;
  left: number;
  top: number;
  heightOfEditableElem: number;
}

const initialState: MessageMenuState = {
  showMessageMenu: false,
  showEditableMessage: false,
  left: 0,
  top: 0,
  heightOfEditableElem: 0,
};

export const messageMenuSlice = createSlice({
  name: 'showMessage',
  initialState,
  reducers: {
    setShowMessageMenu(state, action: PayloadAction<boolean>) {
      state.showMessageMenu = action.payload;
    },
    setShowEditableMessage(state, action: PayloadAction<boolean>) {
      state.showEditableMessage = action.payload;
    },
    setLeft(state, action: PayloadAction<number>) {
      state.left = action.payload;
    },
    setTop(state, action: PayloadAction<number>) {
      state.top = action.payload;
    },
    setHeightOfEditableElem(state, action: PayloadAction<number>) {
      state.heightOfEditableElem = action.payload;
    },
  },
});

export default messageMenuSlice.reducer;
