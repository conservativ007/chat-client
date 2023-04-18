import '../../style/user.scss';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser, defaultUser } from '../../models/IUser';
import { useUser } from '../../hooks/useUser';

export const Users = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setPrivateUser } = userSlice.actions;
  const { name, allUsers } = useAppSelector((state) => state.userReducer);

  const handleClickUser = (user: IUser) => {
    if (user.login.length === 0) return;
    dispatch(setPrivateUser(user));
  };

  useUser();

  const addNotification = (arr: string[]) => {
    const isIncludesMyself = arr.includes(name);
    if (isIncludesMyself === true) {
      return <span className="new-message"></span>;
    }
    return <span></span>;
  };

  return (
    <div className="users">
      <div onClick={() => handleClickUser(defaultUser)} className="group">
        all
      </div>
      {allUsers.map((user: IUser) => {
        if (user.login === name) return;
        return (
          <div
            onClick={() =>
              handleClickUser({
                ...defaultUser,
                login: user.login,
                socketID: user.socketID,
              })
            }
            className="user"
            key={user.id}
          >
            <span
              className={user.online === true ? 'user-online' : 'user-offline'}
            ></span>
            {user.login}

            {addNotification(user.messageForWho)}
          </div>
        );
      })}
    </div>
  );
};
