import { useAppDispatch, useAppSelector } from './redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { userSlice } from '../store/reducers/UserSlice';
import { signupSlice } from '../store/reducers/SignupSlice';

const SIGNUP = 'http://localhost:3001/auth/signup';
const LOGIN = 'http://localhost:3001/auth/login';
const ATTACH_SOCKETID = 'http://localhost:3001/auth/attachsocket';

export const useUserRegistration = () => {
  const { setUser, setToken, setSocketIdToUserStore } = userSlice.actions;
  const { setLogin, setPassword } = signupSlice.actions;
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );
  const { myself } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onConnect = () => {
      attachToSocketIdToUser(socket.id);
    };

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [myself]);

  const attachToSocketIdToUser = (socketId: string) => {
    axios
      .post(ATTACH_SOCKETID, { socketId, userId: myself.id })
      .then((response) => {
        // console.log(response);
        const { status, data } = response;

        // if (status !== 200) return;
        dispatch(setSocketIdToUserStore(data));
        navigate('/chat');
      })
      .catch((err) => {
        console.log(err);
        socket.disconnect();
      });
  };

  const saveUserToLocal = (data: any) => {
    dispatch(setUser(data[0]));
    dispatch(setToken(data[1].accessToken));
  };

  const socketConnect = () => {
    socket.connect();
  };

  const signup = () => {
    const URL = action === 'signup' ? SIGNUP : LOGIN;

    axios
      .post(URL, { login, password })
      .then((response) => {
        const { status, data } = response;

        // if (status !== 201) return;
        saveUserToLocal(data);
        socketConnect();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        socket.disconnect();
      });
  };

  return { signup };
};
