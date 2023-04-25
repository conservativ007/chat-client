import '../../style/user.scss';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser, defaultUser } from '../../models/IUser';
import { useUser } from '../../hooks/useUser';
import { Group } from './Group';
import { useRef } from 'react';
import { useLastMessagesFromUsers } from '../../hooks/useLastMessagesFromUsers';

export let refOfUsers: any;

export const Users = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setPrivateUser } = userSlice.actions;
  const { myself, allUsers } = useAppSelector((state) => state.userReducer);

  refOfUsers = useRef<HTMLDivElement | null>(null);

  const handleClickUser = (user: IUser) => {
    if (user.login.length === 0) return;
    dispatch(setPrivateUser(user));
  };

  useUser();
  useLastMessagesFromUsers();

  const addNotification = (arr: string[]) => {
    const isIncludesMyself = arr.includes(myself.login);
    if (isIncludesMyself === true) {
      return <span className="new-message"></span>;
    }
    return;
  };

  return (
    <div className="users" ref={refOfUsers}>
      <Group />
      {allUsers.map((user: IUser) => {
        if (user.login === myself.login) return;
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
            <div className="user-avatar">{user.login.slice(0, 1)}</div>
            <span
              className={user.online === true ? 'user-online' : 'user-offline'}
            ></span>
            <span className="user-name">{user.login}</span>

            {addNotification(user.messageForWho)}
            <div className="user-divider"></div>
          </div>
        );
      })}
    </div>
  );
};
