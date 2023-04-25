import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './settings.scss';
import { useNavigate } from 'react-router-dom';
import { useAvatars } from './useAvatars';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';
import { IUser } from '../../../models/IUser';

export const Settings = () => {
  const navigate = useNavigate();

  const { myself } = useAppSelector((state) => state.userReducer);
  const [srcAvatar, setSrcAvatar] = useState('');

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const avatars = useAvatars();

  useEffect(() => {
    import(`../../../assets/avatars/${myself.avatar}.png`).then((image) => {
      const src = image.default;
      setSrcAvatar(src);
    });
  }, [myself]);

  const test = (avatar: string) => {
    setSrcAvatar(avatar);

    const getKeyByValue = (object: any, value: string) => {
      return Object.keys(object).find((key: string) => object[key] === value);
    };

    let value = getKeyByValue(avatars, avatar);
    socket.emit(
      'setUserAvatar',
      { userId: myself.id, avatar: value },
      (response: IUser) => {
        dispatch(setUser(response));
      }
    );
  };

  return (
    <div className="settings">
      <header>
        <h1>settings</h1>
        <h2 onClick={() => navigate('/chat')}>back</h2>
      </header>
      <div className="user-details">
        <div className="user-avatar">
          <div className="user-avatar__avatar">
            <img src={srcAvatar} alt="user-avatar" />
          </div>
          <div className="user-avatar__avatars">
            <p className="user-avatar__description">choice your avatar</p>
            <div>
              {Object.values(avatars).map((value, index) => {
                return (
                  <img
                    onClick={() => test(value)}
                    key={index}
                    src={value}
                    alt="user-avatar"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="user-username">
          <div>username (login)</div>
          <input type="text" placeholder="change your name" />
        </div>
        <div className="user-password">
          <div>password</div>
          <input type="text" placeholder="enter old password" />
          <input type="text" placeholder="enter new password" />
        </div>
      </div>
    </div>
  );
};
