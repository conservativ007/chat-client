import axios from 'axios';
import { useAppDispatch } from './redux';
import { userSlice } from '../store/reducers/UserSlice';
import { toast } from 'react-toastify';

const URL_CHANGE_USERNAME = 'http://localhost:3001/users/change-username';
const URL_CHANGE_USERPASSWORD =
  'http://localhost:3001/users/change-userpassword';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const changeUser = (action: 'name' | 'password', conf: any) => {
    let URL = '';

    if (action === 'name') {
      URL = URL_CHANGE_USERNAME;
    }

    if (action === 'password') {
      URL = URL_CHANGE_USERPASSWORD;
    }
    axios
      .post(URL, conf)
      .then((response) => {
        console.log(response);

        dispatch(setUser(response.data));

        // toast('username changed successfuly!', {
        //   position: 'top-center',
        //   autoClose: 2000,
        // });
        getToast(true, `${action} changed successfuly!`);
      })
      .catch((error) => {
        getToast(false, `failed to change ${action}`);
        // toast.error('failed to change username', {
        //   position: 'top-center',
        //   autoClose: 2000,
        // });
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
