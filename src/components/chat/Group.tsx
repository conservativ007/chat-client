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
      {allUsers
        .filter((user) => user.online === true)
        .map((user, index) => {
          if (index > 3) return;

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
      <div className="group-count">
        {allUsers.filter((user) => user.online === true).length}
      </div>
    </div>
  );
};
