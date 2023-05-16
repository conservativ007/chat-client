import axios from 'axios';
import { IDeleteCharacter } from '../models/IDeleteCharacter';
import { useAppDispatch, useAppSelector } from './redux';
import { userSlice } from '../store/reducers/UserSlice';
import { useToast } from 'react-toastify';
import { defaultUser } from '../models/IUser';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import { EMITS } from '../constants/emits';

export const useDeleteUser = () => {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const { token } = useAppSelector((state) => state.userReducer);

  const getToast = useToast;
  const navigate = useNavigate();

  const deleteUser = (conf: IDeleteCharacter) => {
    // console.log(conf);
    axios
      .delete(conf.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status !== 204) return;
        dispatch(setUser(defaultUser));
        navigate('/');
        socket.emit(EMITS.GET_ALL_USERS);
        socket.disconnect();
        // dispatch(setUser(response.data));
        // getToast(true, `${conf.type} was changed successfuly!`);
      })
      .catch((error) => {
        // getToast(false, `${conf.type} has not changed`);
        // console.log(error);
      });
  };
  return deleteUser;
};
