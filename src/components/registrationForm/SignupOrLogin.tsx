import { socket } from '../../socket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { userSlice } from '../../store/reducers/UserSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CONSTANTS } from '../../constants/constants';
import { useToast } from '../../hooks/useToast';
import { Signup } from './Signup';

export const SignupOrLogin = () => {
  const { setUser, setToken, setRtToken, setSocketIdToUserStore } =
    userSlice.actions;
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );
  const { myself } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getToast = useToast;

  useEffect(() => {
    const onConnect = () => {
      attachSocketIdToUser(socket.id);
    };

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [myself]);

  const attachSocketIdToUser = (socketId: string) => {
    axios
      .post(CONSTANTS.ATTACH_SOKETID, { socketId, userId: myself.id })
      .then((response) => {
        const { data } = response;

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
    dispatch(setRtToken(data[1].refreshToken));
  };

  const socketConnect = () => {
    socket.connect();
  };

  const signup = () => {
    const URL = action === 'signup' ? CONSTANTS.SIGNUP : CONSTANTS.LOGIN;
    console.log(URL);

    axios
      .post(URL, { login, password })
      .then((response) => {
        const { data } = response;

        saveUserToLocal(data);
        socketConnect();
      })
      .catch((err) => {
        console.log(err);

        socket.disconnect();

        const { response } = err;
        getToast(false, response.data.message);
      });
  };

  return <Signup signup={signup} />;
};
