import { Button, Form, InputGroup } from 'react-bootstrap';
import '../../style/registartion.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch } from '../../hooks/redux';

type AppProps = {
  buttonText: 'registration' | 'login';
};

const URL = 'http://localhost:3001/users';

export const UserRegistration = ({ buttonText }: AppProps) => {
  const [login, seLogin] = useState('');
  const [password, sePassword] = useState('');

  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonText === 'registration') {
      console.log('from socket connection');
      console.log(socket);

      axios.post(URL, { login, password }).then((response) => {
        const { status } = response;
        const { login } = response.data;

        console.log('from response');
        console.log(response);

        if (status === 201) {
          navigate('/chat');
          socket.connect();
          socket.emit('join', { name: login });

          dispatch(setUser(login));
        }
      });
    }
  };

  return (
    <div className="registration-form">
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
