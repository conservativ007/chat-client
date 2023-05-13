import './user.scss';
import { userSlice } from '../../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IUser, defaultUser } from '../../../models/IUser';
import { useUser } from '../../../hooks/user/useUser';
import { Group } from '../general-chat/Group';
import { useEffect, useRef } from 'react';
import { UserAvatar } from '../userAvatar/UserAvatar';
import { useSizeOfUsersContainer } from '../../../hooks/user/useSizeOfUsersContainer';

export let refOfUsers: any;

export const Users = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setPrivateUser } = userSlice.actions;
  const { myself, allUsers } = useAppSelector((state) => state.userReducer);

  refOfUsers = useRef<HTMLDivElement>(null);

  useUser();
  const getSizeOfUsersContainer = useSizeOfUsersContainer();

  const handleClickUser = (user: IUser) => {
    if (user.login.length === 0) return;
    dispatch(setPrivateUser(user));
  };

  const handleUserName = (name: string) => {
    if (getSizeOfUsersContainer === 90) {
      return name.slice(0, 1).toUpperCase();
    }
    return name;
  };

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
                ...user,
                password: null,
              })
            }
            className="user"
            key={user.id}
            data-login={user.login}
          >
            <UserAvatar srcAvatar={user.avatar} />
            <span
              className={user.online === true ? 'user-online' : 'user-offline'}
            ></span>
            <span className="user-name">{handleUserName(user.login)}</span>
            {addNotification(user.messageForWho)}
          </div>
        );
      })}
    </div>
  );
};
