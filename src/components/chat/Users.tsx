import { useEffect } from 'react';
import { socket } from '../../socket';

import '../../style/user.scss';
import { userSlice } from '../../store/reducers/UserSlice';
import { privateMessageSlice } from '../../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser, defaultUser } from '../../models/IUser';
import { CLIENT_RENEG_LIMIT } from 'tls';

export const Users = () => {
  const dispatch = useAppDispatch();

  const { setPrivateUser, setAllUsers } = userSlice.actions;
  const { setPrivateMessages } = privateMessageSlice.actions;

  const { name, allUsers } = useAppSelector((state) => state.userReducer);
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
      // userForPrivateMessage.login === 'all' ||
      userForPrivateMessage.login.length === 0
    ) {
      return;
    }

    if (userForPrivateMessage.login !== 'all') {
      // console.log(userForPrivateMessage);
      socket.emit('getAllPrivateMessages', {
        senderName: name,
        receiverName: userForPrivateMessage.login,
      });

      // remove notification (marker) when the user was selected
      socket.emit('removeNameForMessageTo', {
        senderName: name,
        receiverName: userForPrivateMessage.login,
      });
    }

    // select user for message
    socket.emit('selectUserForMessage', {
      senderName: name,
      receiverName: userForPrivateMessage.login,
    });
  }, [name, userForPrivateMessage]);

  useEffect(() => {
    // first emit all users
    socket.emit('getAllUsers');

    // four resieved all users in the function
    const getAllUsers = (users: IUser[]) => {
      dispatch(setAllUsers(users));
    };

    // second see on the server side
    // third resieved all users
    socket.on('getAllUsers', getAllUsers);

    return () => {
      socket.off('getAllUsers', getAllUsers);
    };
  }, []);

  const addNotification = (senderName: string, arr: string[]) => {
    const isIncludesMyself = arr.includes(name);
    return isIncludesMyself;
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
            {addNotification(user.login, user.messageForWho) === true ? (
              <span className="new-message"></span>
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
};
