import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { userSlice } from '../store/reducers/UserSlice';
import { IUser, defaultUser } from '../models/IUser';
import { socket } from '../socket';
import { refOfUsers } from '../components/chat/Users';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const { setPrivateUser, setAllUsers } = userSlice.actions;

  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const navigate = useNavigate();

  // when the user not found
  useEffect(() => {
    console.log(myself);
    if (myself.login?.length === 0) navigate('/');
  }, [myself]);

  // write start values to target messages
  useEffect(() => {
    dispatch(setPrivateUser(defaultUser));
  }, []);

  useEffect(() => {
    // select user for message
    socket.emit('selectUserForMessage', {
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
    });
  }, [myself, userForPrivateMessage]);

  useEffect(() => {
    // first emit all users
    socket.emit('getAllUsers', myself.login);

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
  }, [myself]);

  // get messages from selected user
  useEffect(() => {
    if (
      userForPrivateMessage.login === 'all' ||
      userForPrivateMessage.login.length === 0
    ) {
      return;
    }

    socket.emit('getAllPrivateMessages', {
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
    });

    // remove notification (marker) when the user was selected
    socket.emit('removeNameForMessageTo', {
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
    });
  }, [myself, userForPrivateMessage]);

  useEffect(() => {
    const users = refOfUsers.current?.querySelectorAll('.user');
    if (users === undefined) return;
    users.forEach((elemOfUser: HTMLDivElement) => {
      elemOfUser.classList.remove('user-active');

      const userName = elemOfUser.querySelector('.user-name')?.innerHTML;
      if (userName === userForPrivateMessage.login) {
        elemOfUser.classList.add('user-active');
      }
    });
  }, [userForPrivateMessage]);
};
