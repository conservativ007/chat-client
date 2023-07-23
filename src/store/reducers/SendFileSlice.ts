import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SendFileState {
  isFileAttach: boolean;
  fileName: string;
  fileType: string;
  fileSize: number;
}

const initialState: SendFileState = {
  isFileAttach: false,
  fileName: '',
  fileType: '',
  fileSize: 0,
};

export const sendFileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileAttach(state, action: PayloadAction<boolean>) {
      state.isFileAttach = action.payload;
    },
    setFileName(state, action: PayloadAction<string>) {
      state.fileName = action.payload;
    },
    setFileType(state, action: PayloadAction<string>) {
      state.fileType = action.payload;
    },
    setFileSize(state, action: PayloadAction<number>) {
      state.fileSize = action.payload;
    },
    resetFileState(state) {
      state.fileName = '';
      state.fileSize = 0;
      state.fileType = '';
      state.isFileAttach = false;
    },
  },
});

export default sendFileSlice.reducer;
