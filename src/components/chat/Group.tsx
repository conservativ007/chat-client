import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { defaultUser } from '../../models/IUser';
import { userSlice } from '../../store/reducers/UserSlice';

export const Group = () => {
  const { allUsers } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const { setPrivateUser } = userSlice.actions;

  return (
    <div
      onClick={() => dispatch(setPrivateUser(defaultUser))}
      className="user group"
    >
      {allUsers.map((user, index) => {
        return (
          <div
            key={user.id}
            style={{ left: `${index * 25 + 5}px` }}
            className="group-avatar"
          >
            {user.login.slice(0, 1)}
          </div>
        );
      })}
      <div style={{ display: 'none' }} className="user-name">
        all
      </div>
    </div>
  );
};
