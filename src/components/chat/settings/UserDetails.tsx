import { CONSTANTS } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/redux';
import { useInput } from '../../../hooks/useInput';
import { useSettings } from '../../../hooks/useSettings';
import { useDeleteUser } from '../../../hooks/useDeleteUser';
import { IChangeUserName } from '../../../models/IChangeUserName';
import { IChangeUserPassword } from '../../../models/IChangeUserPassword';
import { IDeleteCharacter } from '../../../models/IDeleteCharacter';
import { ChangeUserAvatar } from './ChangeUserAvatar';
import { UserAvatar } from './UserAvatar';
import { UserAvatars } from './UserAvatars';

export const UserDetails = () => {
  const userLogin = useInput('');
  const oldPassword = useInput('');
  const newPassword = useInput('');
  const deleteCharacter = useInput('');

  const getUseSettings = useSettings();
  const getUseDelete = useDeleteUser();

  const { myself } = useAppSelector((state) => state.userReducer);

  const changeName = () => {
    if (userLogin.value.length === 0) {
      console.log('userName.length === 0');
      return;
    }

    const conf: IChangeUserName = {
      type: 'name',
      url: CONSTANTS.URL_CHANGE_USERNAME,
      userId: myself.id,
      newLogin: userLogin.value,
    };
    getUseSettings(conf);
  };

  const changePassword = () => {
    const conf: IChangeUserPassword = {
      type: 'password',
      url: CONSTANTS.URL_CHANGE_USERPASSWORD,
      userId: myself.id,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    };
    getUseSettings(conf);
  };

  const handleDeleteCharacter = () => {
    if (deleteCharacter.value != 'delete') {
      return;
    }

    const conf: IDeleteCharacter = {
      type: 'delete',
      url: `${CONSTANTS.DELETE}/${myself.id}`,
    };

    getUseDelete(conf);
  };

  return (
    <div className="user-details">
      <div className="user-avatar">
        <UserAvatar />
        <ChangeUserAvatar />
        <UserAvatars />
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
      <div className="user-delete">
        <div>delete-character</div>
        <input
          value={deleteCharacter.value}
          onChange={(e) => deleteCharacter.onChange(e)}
          type="text"
          placeholder="type DELETE"
        />
        <div
          onClick={handleDeleteCharacter}
          className="user-userpassword__delete"
        >
          delete character
        </div>
      </div>
    </div>
  );
};
