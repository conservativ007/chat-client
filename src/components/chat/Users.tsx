import { useEffect, useState } from 'react';
import { socket } from '../../socket';

import '../../style/user.css';
import { userSlice } from '../../store/reducers/UserSlice';
import { privateMessageSlice } from '../../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const Users = () => {
  const [users, setUsers] = useState([]);

  const { setPrivateUser } = userSlice.actions;
  const { setPrivateMessages } = privateMessageSlice.actions;
  const dispatch = useAppDispatch();

  const { name } = useAppSelector((state) => state.userReducer);
  const { userNameForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const handleClickUser = (login: string) => {
    if (login.length === 0) return;
    console.log(login);

    dispatch(setPrivateUser(login));
  };

  // write start values to target messages
  useEffect(() => {
    dispatch(setPrivateUser('all'));
  }, []);

  // get messages from selected user
  useEffect(() => {
    if (
      userNameForPrivateMessage === 'all' ||
      userNameForPrivateMessage.length === 0
    )
      return;
    console.log(userNameForPrivateMessage);
    socket.emit(
      'getAllPrivateMessages',
      { senderName: name, receiverName: userNameForPrivateMessage },
      (val: any) => {
        console.log('val from getAllPrivateMessages');
        console.log(val);
        dispatch(setPrivateMessages(val));
      }
    );
  }, [userNameForPrivateMessage]);

  useEffect(() => {
    // first emit all users
    socket.emit('getAllUsers');

    // four resieved all users in the function
    const getAllUsers = (users: any) => {
      console.log(users);
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
      <div onClick={() => handleClickUser('all')} className="group">
        all
      </div>
      {users.map((user: any) => {
        if (user.login === name) return;
        return (
          <div
            onClick={() => handleClickUser(user.login)}
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
