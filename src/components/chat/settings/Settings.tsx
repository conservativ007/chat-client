import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './settings.scss';
import { useNavigate } from 'react-router-dom';
import { useAvatars } from '../../../hooks/useAvatars';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';
import { IUser } from '../../../models/IUser';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const URL_CHANGE_USERNAME = 'http://localhost:3001/users/change-username';

export const Settings = () => {
  const navigate = useNavigate();

  const { myself } = useAppSelector((state) => state.userReducer);
  const [srcAvatar, setSrcAvatar] = useState('');

  const [userLogin, setUserLogin] = useState('');

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const avatars = useAvatars();

  useEffect(() => {
    import(`../../../assets/avatars/${myself.avatar}.png`).then((image) => {
      const src = image.default;
      setSrcAvatar(src);
    });
  }, [myself]);

  const changeAvatar = (avatar: string) => {
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

  const changeName = () => {
    if (userLogin.length === 0) {
      console.log('userName.length === 0');
      return;
    }

    const conf = {
      userId: myself.id,
      newLogin: userLogin,
    };

    axios
      .post(URL_CHANGE_USERNAME, conf)
      .then((response) => {
        console.log(response);

        dispatch(setUser(response.data));

        toast('username changed successfuly!', {
          position: 'top-center',
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error('failed to change username', {
          position: 'top-center',
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="settings">
      <ToastContainer position="top-center" theme="light" />
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
                    onClick={() => changeAvatar(value)}
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
          <div className="user-username__login">username (login)</div>
          <input
            style={{
              backgroundColor: '#535c68',
              color: 'white',
              height: '40px',
              border: 'none',
            }}
            value={myself.login}
            type="text"
            disabled
          />
          <input
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            type="text"
            placeholder="change your name"
          />
          <div onClick={changeName} className="user-username__change">
            change name
          </div>
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
