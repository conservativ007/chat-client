import { Button, Form, InputGroup } from 'react-bootstrap';
import '../../style/registartion.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch } from '../../hooks/redux';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

type AppProps = {
  buttonText: 'registration' | 'login';
};

const URL_CREATE_USER = 'http://localhost:3001/users';
const URL_LOGIN_USER = 'http://localhost:3001/users/login';

export const UserRegistrationForm = ({ buttonText }: AppProps) => {
  const [login, seLogin] = useState('');
  const [password, sePassword] = useState('');

  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    socket.connect();
  };

  useEffect(() => {
    function onConnect() {
      const URL =
        buttonText === 'registration' ? URL_CREATE_USER : URL_LOGIN_USER;

      const { id: socketID } = socket;
      axios
        .post(URL, { login, password, socketID })
        .then((response) => {
          const { status } = response;
          // const { login } = response.data;

          if (status === 201) {
            navigate('/chat');
            dispatch(setUser(response.data));
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
  }, [login, password, buttonText]);

  return (
    <div className="registration-form">
      <ToastContainer position="top-center" autoClose={2000} theme="light" />

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="login"
          style={{ width: '100%' }}
          value={login}
          onChange={(e) => seLogin(e.target.value)}
        />
        <Form.Control
          placeholder="password"
          style={{ width: '100%' }}
          value={password}
          onChange={(e) => sePassword(e.target.value)}
        />
        <Button
          onClick={handleClick}
          variant="outline-secondary"
          id="button-addon2"
        >
          {buttonText}
        </Button>
      </InputGroup>
    </div>
  );
};
