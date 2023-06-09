import './header.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import arrowBack from './arrow-back2.svg';
import generalChatIcon from '../general-chat/images/chat.svg';

import settings from '../../../assets/images/settings/settings.png';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';
import { showMessgaesOrUsersSlice } from '../../../store/reducers/ShowMessgaesOrUsersSlice';
import { defaultUser, userAfterLogin } from '../../../models/IUser';

export const Header = (): JSX.Element => {
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { setToken, setUser, setAllUsers, setPrivateUser } = userSlice.actions;
  const { setPrivateMessages, setMessagesShowingSlowly } =
    privateMessageSlice.actions;
  const { setShowMessages, setShowMessagesToNull } =
    showMessgaesOrUsersSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const socketDisconnect = () => {
    navigate('/');
    dispatch(setToken(''));
    dispatch(setUser(defaultUser));
    dispatch(setPrivateUser(defaultUser));
    dispatch(setAllUsers([]));
    dispatch(setShowMessagesToNull(null));

    socket.disconnect();
  };

  const handleArrowBack = () => {
    dispatch(setPrivateUser(userAfterLogin));
    dispatch(setPrivateMessages([]));
    dispatch(setShowMessages(false));
    dispatch(setMessagesShowingSlowly(true));
  };

  const showUserAvatar = () => {
    if (userForPrivateMessage.login !== '') {
      return <img src={userForPrivateMessage.avatar} alt="" />;
    }
  };

  const showUserName = () => {
    if (userForPrivateMessage.login === 'all') {
      return '';
    }
    if (userForPrivateMessage.login !== '') {
      return userForPrivateMessage.login;
    }
  };

  const showArrowBack = () => {
    if (userForPrivateMessage.login !== '' && sizeOfChatBody < 601) {
      return (
        <div className="navigation">
          <div
            onClick={handleArrowBack}
            className="header-navigation__arrow-back"
          >
            <img src={arrowBack} alt="" />
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <header className="header">
      <div className="header-user">
        {showArrowBack()}
        <div className="user-details">
          <div className="user-avatar">{showUserAvatar()}</div>
          <div className="user-login">{showUserName()}</div>
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
