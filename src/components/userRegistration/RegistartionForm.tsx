import { Button, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signupSlice } from '../../store/reducers/SignupSlice';

type AppProps = {
  signup: () => void;
};

export const RegistartionForm = ({ signup }: AppProps) => {
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );
  const dispatch = useAppDispatch();
  const { setLogin, setPassword } = signupSlice.actions;

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
        <Button onClick={signup} variant="outline-secondary" id="button-addon2">
          {action}
        </Button>
      </InputGroup>
    </div>
  );
};
