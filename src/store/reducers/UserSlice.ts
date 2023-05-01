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
      state.myself = action.payload;
    },
    setPrivateUser(state, action: PayloadAction<IUser>) {
      state.userForPrivateMessage = action.payload;
    },
    setAllUsers(state, action: PayloadAction<IUser[]>) {
      action.payload.sort(customSortUser);
      state.allUsers = action.payload;
    },
  },
});

const customSortUser = (a: IUser, b: IUser) => {
  if (a.login > b.login) {
    return 1;
  }

  if (a.login < b.login) {
    return -1;
  }

  return 0;
};

export default userSlice.reducer;
