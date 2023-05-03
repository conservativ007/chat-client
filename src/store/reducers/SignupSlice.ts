import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISignup {
  login: string;
  password: string;
  action: 'signup' | 'login';
}

const initialState: ISignup = {
  action: 'signup',
  login: '',
  password: '',
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setAction(state, action: PayloadAction<'signup' | 'login'>) {
      state.action = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export default signupSlice.reducer;
