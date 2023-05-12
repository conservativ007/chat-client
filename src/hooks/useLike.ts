import { useEffect } from 'react';
import { socket } from '../socket';
import { useAppDispatch } from './redux';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { IMessage } from '../models/IMessage';

export const useLike = () => {
  const dispatch = useAppDispatch();
  const { updateMessage } = privateMessageSlice.actions;

  useEffect(() => {
    const handleUpdatedMessageForUsers = (response: IMessage) => {
      dispatch(updateMessage(response));
    };

    socket.on('setUpdatedMessageForUsers', handleUpdatedMessageForUsers);

    return () => {
      socket.off('setUpdatedMessageForUsers', handleUpdatedMessageForUsers);
    };
  }, []);
};
