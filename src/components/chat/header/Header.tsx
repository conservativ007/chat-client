import './header.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

import settings from '../../../assets/images/settings/settings.png';
import { socket } from '../../../socket';
import axios from 'axios';
import { userSlice } from '../../../store/reducers/UserSlice';
import { CONSTANTS } from '../../../constants/constants';

export const Header = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { token } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { setToken } = userSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const socketDisconnect = () => {
    navigate('/');
    dispatch(setToken(''));
    axios
      .post(
        CONSTANTS.LOGOUT_USER,
        { userId: myself.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) return;
        socket.disconnect();
      })
      .catch((err) => {
        console.log(err);
      });
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
    </header>
  );
};
