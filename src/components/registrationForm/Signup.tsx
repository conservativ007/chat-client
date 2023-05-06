import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useToast } from '../../hooks/useToast';
import { signupSlice } from '../../store/reducers/SignupSlice';
import '../../style/signup.scss';

type AppProps = {
  signup: () => void;
};

export const Signup = ({ signup }: AppProps) => {
  const { action, login, password } = useAppSelector(
    (state) => state.signupReducer
  );
  const dispatch = useAppDispatch();
  const { setLogin, setPassword, setAction } = signupSlice.actions;

  const changeAction = () => {
    dispatch(setAction(action === 'login' ? 'signup' : 'login'));
  };

  const getToast = useToast;

  const checkLoginAndPassword = () => {
    if (login.length === 0 || password.length === 0) {
      getToast(false, 'you must enter the login and password!');
      return;
    }
    signup();
  };

  return (
    <div className="signup-container">
      <i></i>
      <i></i>
      <div className="login">
        <h2>{action}</h2>
        <div className="input-bx">
          <input
            type="text"
            placeholder="Username"
            autoComplete="new-password"
            required
            value={login}
            onChange={(e) => dispatch(setLogin(e.target.value))}
          />
        </div>
        <div className="input-bx">
          <input
            type="text"
            placeholder="Password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>
        <div className="input-bx">
          <input type="submit" value={action} onClick={checkLoginAndPassword} />
        </div>
        <div className="links">
          <div className="signup" onClick={changeAction}>
            {action === 'login' ? 'signup' : 'login'}
          </div>
        </div>
      </div>
    </div>
  );
};
