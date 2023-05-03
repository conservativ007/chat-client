import { Button, Form, InputGroup } from 'react-bootstrap';
import '../../style/registartion.css';
import { socket } from '../../socket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signupSlice } from '../../store/reducers/SignupSlice';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { useUserRegistration } from '../../hooks/useUserRegistration';

export const UserRegistrationForm = () => {
  const { setLogin, setPassword } = signupSlice.actions;
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );
  const dispatch = useAppDispatch();

  useUserRegistration();

  const handleClick = () => {
    socket.connect();
  };

  return (
    <div className="registration-form">
      <ToastContainer position="top-center" autoClose={2000} theme="light" />

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="login"
          style={{ width: '100%' }}
          value={login}
          onChange={(e) => dispatch(setLogin(e.target.value))}
        />
        <Form.Control
          placeholder="password"
          style={{ width: '100%' }}
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <Button
          onClick={handleClick}
          variant="outline-secondary"
          id="button-addon2"
        >
          {action}
        </Button>
      </InputGroup>
    </div>
  );
};
