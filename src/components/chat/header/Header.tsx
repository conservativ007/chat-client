import './header.scss';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

import settings from '../../../assets/settings/settings.png';
import { socket } from '../../../socket';

export const Header = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const navigate = useNavigate();

  const socketDisconnect = () => {
    navigate('/');
    socket.disconnect();
  };

  return (
    <header>
      <div className="user-info">
        <div className="user-avatar">
          <img src={myself.avatar} alt="user-avatar" />
          <h3>{myself.login}</h3>
        </div>
        <h3>{userForPrivateMessage.login && userForPrivateMessage.login}</h3>
      </div>
      <nav>
        <p onClick={socketDisconnect}>exit</p>
        <div className="settings" onClick={() => navigate('/settings')}>
          <img src={settings} alt="" />
        </div>
      </nav>
    </header>
  );
};
