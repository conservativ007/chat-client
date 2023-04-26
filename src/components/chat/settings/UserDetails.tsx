import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useImageSrc } from '../../../hooks/useImageSrc';
import { useInput } from '../../../hooks/useInput';
import { useSettings } from '../../../hooks/useSettings';
import { UserAvatars } from './UserAvatars';
import { userSlice } from '../../../store/reducers/UserSlice';
import { useAvatars } from '../../../hooks/useAvatars';
import { socket } from '../../../socket';
import { IUser } from '../../../models/IUser';

export const UserDetails = () => {
  const userLogin = useInput('');
  const oldPassword = useInput('');
  const newPassword = useInput('');

  const getUseSettings = useSettings();

  const { myself } = useAppSelector((state) => state.userReducer);
  const srcAvatar = useImageSrc('');

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const avatars = useAvatars();

  useEffect(() => {
    import(`../../../assets/avatars/${myself.avatar}.png`).then((image) => {
      const src = image.default;
      srcAvatar.setValue(src);
    });
  }, [myself]);

  const changeAvatar = (avatar: string) => {
    srcAvatar.setValue(avatar);

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
    if (userLogin.value.length === 0) {
      console.log('userName.length === 0');
      return;
    }

    const conf = {
      userId: myself.id,
      newLogin: userLogin.value,
    };

    getUseSettings('name', conf);
  };

  const changePassword = () => {
    const conf = {
      userId: myself.id,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    };

    getUseSettings('password', conf);
  };

  return (
    <div className="user-details">
      <div className="user-avatar">
        <div className="user-avatar__avatar">
          <img src={srcAvatar.value} alt="user-avatar" />
        </div>
        <div className="user-avatar__avatars">
          <p className="user-avatar__description">choice your avatar</p>
          <div>
            <UserAvatars changeAvatar={changeAvatar} />
          </div>
        </div>
      </div>
      <div className="user-username">
        <div className="user-username__login">username (login)</div>
        <input
          className="user-username__login-input"
          value={myself.login}
          type="text"
          disabled
        />
        <input
          value={userLogin.value}
          onChange={(e) => userLogin.onChange(e)}
          type="text"
          placeholder="change your name"
        />
        <div onClick={changeName} className="user-username__change">
          change name
        </div>
      </div>
      <div className="user-password">
        <div>password</div>
        <input
          value={oldPassword.value}
          onChange={(e) => oldPassword.onChange(e)}
          type="text"
          placeholder="enter old password"
        />
        <input
          value={newPassword.value}
          onChange={(e) => newPassword.onChange(e)}
          type="text"
          placeholder="enter new password"
        />
        <div onClick={changePassword} className="user-userpassword__change">
          change password
        </div>
      </div>
    </div>
  );
};
