import { useEffect } from 'react';
import { socket } from '../../../socket';
import { EMITS } from '../../../constants/emits';
import { useAppDispatch } from '../../../hooks/redux';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';

export const useDelete = () => {
  const dispatch = useAppDispatch();
  const { deleteMessage } = privateMessageSlice.actions;

  useEffect(() => {
    const handleDeleteMessageForOneUser = (response: any) => {
      dispatch(deleteMessage(response));
    };

    const handleDeleteMessageForGeneralChat = (response: any) => {
      dispatch(deleteMessage(response));
    };

    socket.on(EMITS.DELETE_PRIVATE_MESSAGE, handleDeleteMessageForOneUser);
    socket.on(
      EMITS.DELETE_MESSAGE_FOR_GENERAL_CHAT,
      handleDeleteMessageForGeneralChat
    );

    return () => {
      socket.off(EMITS.DELETE_PRIVATE_MESSAGE, handleDeleteMessageForOneUser);
      socket.off(
        EMITS.DELETE_MESSAGE_FOR_GENERAL_CHAT,
        handleDeleteMessageForGeneralChat
      );
    };
  }, []);
};
