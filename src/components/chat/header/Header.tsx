import './header.scss';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

import settings from '../../../assets/settings/settings.png';
import { useEffect, useState } from 'react';

export const Header = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const [srcAvatar, setSrcAvatar] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    import(`../../../assets/avatars/${myself.avatar}.png`).then((image) => {
      const src = image.default;
      setSrcAvatar(src);
    });
  }, [myself]);

  return (
    <header>
      <div className="user-info">
        <div className="user-avatar">
          <img src={srcAvatar} alt="user-avatar" />
        </div>
        <span> ---- </span>
        <h3>
          {userForPrivateMessage.login ? userForPrivateMessage.login : 'not'}
        </h3>
      </div>
      <div className="settings" onClick={() => navigate('/settings')}>
        <img src={settings} alt="" />
      </div>
    </header>
  );
};
