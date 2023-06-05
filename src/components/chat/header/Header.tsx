import './header.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import arrowBack from './arrow-back.svg';

import settings from '../../../assets/images/settings/settings.png';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';
import { ChatContainerClassesSlice } from '../../../store/reducers/ChatContainerClassesSlice';
import { defaultUser, userAfterLogin } from '../../../models/IUser';

export const Header = (): JSX.Element => {
  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { setToken, setUser, setAllUsers, setPrivateUser } = userSlice.actions;
  const { setPrivateMessages } = privateMessageSlice.actions;
  const { setClassForChatContainer } = ChatContainerClassesSlice.actions;
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

  const handleArrowBack = () => {
    dispatch(setPrivateUser(userAfterLogin));
    dispatch(setPrivateMessages([]));
    dispatch(setClassForChatContainer('mobile-show-users'));
  };

  const showUserAvatar = () => {
    const userLogin = userForPrivateMessage.login;
    if (userLogin !== '' && userLogin !== 'all') {
      return <img src={userForPrivateMessage.avatar} alt="" />;
    }
  };

  return (
    <header className="header">
      <div className="header-navigation">
        {userForPrivateMessage.login === '' ? (
          ''
        ) : (
          <div
            onClick={handleArrowBack}
            className="header-navigation__arrow-back"
          >
            <img src={arrowBack} alt="" />
          </div>
        )}
      </div>

      <div className="header-user">
        <div className="user-avatar">{showUserAvatar()}</div>
        <div className="user-details">
          {userForPrivateMessage.login && userForPrivateMessage.login}
        </div>
      </div>
      <div className="header-settings">
        <p onClick={socketDisconnect}>exit</p>
        <div onClick={() => navigate('/settings')}>
          <img src={settings} alt="" />
        </div>
      </div>
    </header>
  );
};
