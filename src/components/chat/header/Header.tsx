import './header.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

import settings from '../../../assets/images/settings/settings.png';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';
import { defaultUser } from '../../../models/IUser';

export const Header = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { setToken, setUser, setAllUsers, setPrivateUser } = userSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const socketDisconnect = () => {
    navigate('/');
    dispatch(setToken(''));
    dispatch(setUser(defaultUser));
    dispatch(setPrivateUser(defaultUser));
    dispatch(setAllUsers([]));

    socket.disconnect();
  };

  return (
    <header className="header">
      <div className="header__user-info">
        <div className="header__user-avatar">
          <img src={myself.avatar} alt="user-avatar" />
          <h3>{myself.login}</h3>
        </div>
        <h3>{userForPrivateMessage.login && userForPrivateMessage.login}</h3>
      </div>
      <nav>
        <p onClick={socketDisconnect}>exit</p>
        <div className="header-settings" onClick={() => navigate('/settings')}>
          <img src={settings} alt="" />
        </div>
      </nav>
      <div className="user-socketId">{myself.socketID}</div>
    </header>
  );
};
