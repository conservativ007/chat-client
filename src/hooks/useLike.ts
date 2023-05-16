import { useEffect } from 'react';
import { socket } from '../socket';
import { useAppDispatch } from './redux';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { IMessage } from '../models/IMessage';
import { EMITS } from '../constants/emits';

export const useLike = () => {
  const dispatch = useAppDispatch();
  const { updateMessage } = privateMessageSlice.actions;

  useEffect(() => {
    const handleUpdatedMessageForUsers = (response: IMessage) => {
      dispatch(updateMessage(response));
    };

    socket.on(EMITS.SET_LIKE_TO_MESSAGE, handleUpdatedMessageForUsers);

    return () => {
      socket.off(EMITS.SET_LIKE_TO_MESSAGE, handleUpdatedMessageForUsers);
    };
  }, []);
};
