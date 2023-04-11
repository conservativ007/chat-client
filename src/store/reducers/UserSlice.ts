import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  userNameForPrivateMessage: string;
}

const initialState: UserState = {
  name: '',
  userNameForPrivateMessage: '',
};

export const userSlice = createSlice({
  name: 'user42',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      console.log('from userSlice user: ', action.payload);
      state.name = action.payload;
    },
    setPrivateUser(state, action: PayloadAction<string>) {
      console.log('from userSlice privateUSer: ', action.payload);
      state.userNameForPrivateMessage = action.payload;
    },
  },
});

export default userSlice.reducer;
