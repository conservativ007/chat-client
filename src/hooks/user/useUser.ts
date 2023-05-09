import { useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { userSlice } from '../../store/reducers/UserSlice';
import { IUser, defaultUser } from '../../models/IUser';
import { socket } from '../../socket';
import { refOfUsers } from '../../components/chat/users/Users';
import { useNavigate } from 'react-router-dom';
import { groupRef } from '../../components/chat/group/Group';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const { setPrivateUser, setAllUsers, setUser } = userSlice.actions;

  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const navigate = useNavigate();

  // when the user not found
  useEffect(() => {
    const name = myself.login;
    if (name.length === 0 || name === 'all') navigate('/');
  }, [myself]);

  // write start values to target messages
  useEffect(() => {
    dispatch(setPrivateUser(defaultUser));
  }, []);

  // select user for message
  useEffect(() => {
    if (myself.login === 'all') {
      return;
    }
    // console.log(userForPrivateMessage);
    socket.emit('selectUserForMessage', {
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
    });
  }, [myself, userForPrivateMessage]);

  useEffect(() => {
    // first emit all users
    // console.log('from emit getAllUsers');
    // console.log(myself);
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

  // add active class when the user or general chat was chousen
  useEffect(() => {
    // users
    const users = refOfUsers.current?.querySelectorAll('.user');
    if (users === undefined) return;

    users.forEach((elemOfUser: HTMLDivElement) => {
      elemOfUser.classList.remove('user-active');

      if (elemOfUser.dataset.login === userForPrivateMessage.login) {
        elemOfUser.classList.add('user-active');
      }
    });

    // general chat
    let elemOfGroup: HTMLDivElement = groupRef.current;
    if (!elemOfGroup) return;

    if (userForPrivateMessage.login === 'all') {
      elemOfGroup.classList.add('group-active');
    } else {
      elemOfGroup.classList.remove('group-active');
    }
  }, [userForPrivateMessage]);
};
