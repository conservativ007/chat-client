import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultUser, IUser } from '../../models/IUser';

interface UserState {
  myself: IUser;
  userForPrivateMessage: IUser;
  allUsers: IUser[];
}

const initialState: UserState = {
  myself: defaultUser,
  userForPrivateMessage: defaultUser,
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user42',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      // console.log('from userSlice user: ', action.payload);
      state.myself = action.payload;
    },
    setPrivateUser(state, action: PayloadAction<IUser>) {
      // console.log('from userSlice privateUSer: ', action.payload);
      state.userForPrivateMessage = action.payload;
    },
    setAllUsers(state, action: PayloadAction<IUser[]>) {
      state.allUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
