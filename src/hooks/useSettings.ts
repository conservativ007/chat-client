import axios from 'axios';
import { useAppDispatch, useAppSelector } from './redux';
import { userSlice } from '../store/reducers/UserSlice';
import { toast } from 'react-toastify';
import { IChangeUserPassword } from '../models/IChangeUserPassword';
import { IChangeUserName } from '../models/IChangeUserName';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const { token } = useAppSelector((state) => state.userReducer);

  const changeUser = (conf: IChangeUserPassword | IChangeUserName) => {
    // console.log(conf);
    axios
      .post(conf.url, conf, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(setUser(response.data));
        getToast(true, `${conf.type} was changed successfuly!`);
      })
      .catch((error) => {
        getToast(false, `${conf.type} has not changed`);
        // console.log(error);
      });
  };

  const getToast = (success: boolean, message: string) => {
    if (success === true) {
      toast(message, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    toast.error(message, {
      position: 'top-center',
      autoClose: 2000,
    });
  };

  return changeUser;
};
