import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      console.log('from userSlice name: ', action.payload);
      state.name = action.payload;
    },
  },
});

export default userSlice.reducer;
