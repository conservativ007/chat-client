import { useEffect } from 'react';
import { socket } from '../../../../socket';
import { EMITS } from '../../../../constants/emits';
import { useAppDispatch } from '../../../../hooks/redux';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';

export const useEdit = () => {
  const dispatch = useAppDispatch();
  const { updateMessage } = privateMessageSlice.actions;

  useEffect(() => {
    const handleUpdatedMessageForUsers = (response: any) => {
      dispatch(updateMessage(response));
    };

    const handleUpdatedMessageForGeneralChat = (response: any) => {
      dispatch(updateMessage(response));
    };

    socket.on(EMITS.UPDATE_MESSAGE_FOR_ONE_USER, handleUpdatedMessageForUsers);
    socket.on(
      EMITS.UPDATE_MESSAGE_FOR_GENERAL_CHAT,
      handleUpdatedMessageForGeneralChat
    );

    return () => {
      socket.off(
        EMITS.UPDATE_MESSAGE_FOR_ONE_USER,
        handleUpdatedMessageForUsers
      );
      socket.off(
        EMITS.UPDATE_MESSAGE_FOR_GENERAL_CHAT,
        handleUpdatedMessageForGeneralChat
      );
    };
  }, []);
};
