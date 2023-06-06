import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import privateMessageReducer from './reducers/PrivateMessageSlice';
import changeSizeOfElementsReducer from './reducers/SizeOfElements';
import signupReducer from './reducers/SignupSlice';
import messaggeMenuReducer from './reducers/MessaggeMenu';
import showMessgaesOrUsersReducer from './reducers/ShowMessgaesOrUsersSlice';

const rootReducer = combineReducers({
  userReducer,
  privateMessageReducer,
  changeSizeOfElementsReducer,
  signupReducer,
  messaggeMenuReducer,
  showMessgaesOrUsersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
