import { useAppDispatch, useAppSelector } from './redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { userSlice } from '../store/reducers/UserSlice';

const SIGNUP = 'http://localhost:3001/auth/signup';
const LOGIN = 'http://localhost:3001/auth/login';

export const useUserRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { setUser, setToken } = userSlice.actions;
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );

  useEffect(() => {
    function onConnect() {
      const URL = action === 'signup' ? SIGNUP : LOGIN;

      console.log(URL);
      const { id: socketID } = socket;
      axios
        .post(URL, { login, password, socketID })
        .then((response) => {
          const { status } = response;

          console.log(response);

          if (status === 200 || status === 201) {
            navigate('/chat');
            dispatch(setUser(response.data[0]));
            dispatch(setToken(response.data[1].accessToken));
          }
        })
        .catch((err) => {
          const { response } = err;
          socket.disconnect();
          toast(response.data.message, {
            position: 'top-center',
            autoClose: 2000,
          });
        });
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [action, login, password]);
};
