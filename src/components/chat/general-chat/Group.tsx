import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useSizeOfUsersContainer } from '../../../hooks/user/useSizeOfUsersContainer';
import { defaultUser } from '../../../models/IUser';
import { userSlice } from '../../../store/reducers/UserSlice';
import { showMessgaesOrUsersSlice } from '../../../store/reducers/ShowMessgaesOrUsersSlice';

import './group.scss';
export let groupRef: any;

export const Group = () => {
  const { allUsers, myself } = useAppSelector((state) => state.userReducer);
  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const dispatch = useAppDispatch();
  const { setPrivateUser } = userSlice.actions;
  const { setShowMessages } = showMessgaesOrUsersSlice.actions;

  const getSizeOfUsersContainer = useSizeOfUsersContainer();

  groupRef = useRef<HTMLDivElement>(null);

  const countOfUsers = () =>
    allUsers.filter(
      (user) => user.online === true && myself.login !== user.login
    ).length;

  const handleCliclUser = () => {
    // dispatch(setPrivateUser(defaultUser));
    dispatch(setShowMessages(true));

    if (sizeOfChatBody < 601) {
      setTimeout(() => dispatch(setPrivateUser(defaultUser)), 400);
    }

    if (sizeOfChatBody > 600) {
      dispatch(setPrivateUser(defaultUser));
    }
  };

  if (getSizeOfUsersContainer === 90) {
    return (
      <div onClick={handleCliclUser} className="group" ref={groupRef}>
        <div className="group-count">{countOfUsers()}</div>
      </div>
    );
  }

  return (
    <div onClick={handleCliclUser} className="group" ref={groupRef}>
      <div className="group-description">general chat</div>
      {allUsers
        .filter((user) => user.online === true && myself.login !== user.login)
        .map((user, index) => {
          if (index > 3) return;

          return (
            <div
              key={user.id}
              style={{ left: `${index * 25 + 7}px` }}
              className="group-avatar"
            >
              {user.login.slice(0, 1)}
            </div>
          );
        })}
      <div className="group-count">{countOfUsers()}</div>
    </div>
  );
};
