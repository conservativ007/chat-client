import { useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { userSlice } from '../../store/reducers/UserSlice';
import { sizeOfElementsSlice } from '../../store/reducers/SizeOfElements';
import { IUser, defaultUser, userAfterLogin } from '../../models/IUser';
import { socket } from '../../socket';
import { refOfUsers } from '../../components/chat/users/Users';
import { useNavigate } from 'react-router-dom';
import { groupRef } from '../../components/chat/general-chat/Group';
import { EMITS } from '../../constants/emits';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const { setPrivateUser, setAllUsers, setUser } = userSlice.actions;
  const { setSizeOfUsersContainer } = sizeOfElementsSlice.actions;

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
    dispatch(setPrivateUser(userAfterLogin));
  }, []);
  // // write start values to target messages
  // useEffect(() => {
  //   dispatch(setPrivateUser(defaultUser));
  // }, []);

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
    socket.emit(EMITS.GET_ALL_USERS, myself.login);

    // four resieved all users in the function
    const getAllUsers = (users: IUser[]) => {
      dispatch(setAllUsers(users));
    };

    // second see on the server side
    // third resieved all users
    socket.on(EMITS.GET_ALL_USERS, getAllUsers);

    return () => {
      socket.off(EMITS.GET_ALL_USERS, getAllUsers);
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

    socket.emit(EMITS.GET_MESSAGES_FOR_PRIVATE_CHAT, {
      senderId: myself.id,
      receiverId: userForPrivateMessage.id,
    });

    // remove notification (marker) when the user was selected
    socket.emit(EMITS.REMOVE_NAME_FOR_MESSAGE_TO, {
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

  const getWidthOfUsersContainer = () => {
    let elemOfUsersContainer: HTMLDivElement = refOfUsers.current;
    const widthOfElemUsersContainer =
      elemOfUsersContainer.getBoundingClientRect().width;
    return widthOfElemUsersContainer;
  };

  useEffect(() => {
    const resizeListener = () => {
      dispatch(setSizeOfUsersContainer(getWidthOfUsersContainer()));
    };
    dispatch(setSizeOfUsersContainer(getWidthOfUsersContainer()));

    window.addEventListener('resize', resizeListener);

    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
};
