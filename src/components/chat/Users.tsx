import { useEffect, useState } from 'react';
import { socket } from '../../socket';

import '../../style/user.css';
import { userSlice } from '../../store/reducers/UserSlice';
import { privateMessageSlice } from '../../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser, defaultUser } from '../../models/IUser';

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { setPrivateUser } = userSlice.actions;
  const { setPrivateMessages } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { name } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const handleClickUser = (user: IUser) => {
    if (user.login.length === 0) return;
    dispatch(setPrivateUser(user));
  };

  // write start values to target messages
  useEffect(() => {
    dispatch(setPrivateUser(defaultUser));
  }, []);

  // get messages from selected user
  useEffect(() => {
    if (
      userForPrivateMessage.login === 'all' ||
      userForPrivateMessage.login.length === 0
    )
      return;
    console.log(userForPrivateMessage);
    socket.emit(
      'getAllPrivateMessages',
      { senderName: name, receiverName: userForPrivateMessage.login },
      (val: any) => {
        dispatch(setPrivateMessages(val));
      }
    );
  }, [userForPrivateMessage]);

  useEffect(() => {
    // first emit all users
    socket.emit('getAllUsers');

    // four resieved all users in the function
    const getAllUsers = (users: IUser[]) => {
      // console.log(users);
      setUsers(users);
    };

    // second see on the server side
    // third resieved all users
    socket.on('getAllUsers', getAllUsers);

    return () => {
      socket.off('getAllUsers', getAllUsers);
    };
  }, []);

  return (
    <div className="users">
      <div onClick={() => handleClickUser(defaultUser)} className="group">
        all
      </div>
      {users.map((user: IUser) => {
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
          </div>
        );
      })}
    </div>
  );
};
