import axios from 'axios';
import { useAppDispatch, useAppSelector } from './redux';
import { userSlice } from '../store/reducers/UserSlice';
import { IChangeUserPassword } from '../models/IChangeUserPassword';
import { IChangeUserName } from '../models/IChangeUserName';
import { useToast } from './useToast';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const { token } = useAppSelector((state) => state.userReducer);

  const getToast = useToast;

  const changeUser = (conf: IChangeUserPassword | IChangeUserName) => {
    // console.log(conf);
    axios
      .post(conf.url, conf, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setUser(response.data));
        getToast(true, `${conf.type} was changed successfuly!`);
      })
      .catch((error) => {
        getToast(false, `${conf.type} has not changed`);
        // console.log(error);
      });
  };
  return changeUser;
};
