import { useEffect } from 'react';
import { socket } from '../socket';
import { useAppDispatch } from './redux';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { ILike } from '../models/ILike';
import { IMessage } from '../models/IMessage';

export const useLike = () => {
  const dispatch = useAppDispatch();
  const { setLikeForPrivateMessageForReciever, updateMessage } =
    privateMessageSlice.actions;

  useEffect(() => {
    // const handleSentLikeForReciever = (response: ILike) => {
    //   console.log(response);
    //   dispatch(setLikeForPrivateMessageForReciever(response));
    // };

    const handleSetLastMessageForUsers = (response: IMessage) => {
      dispatch(updateMessage(response));
      // console.log(response);
    };

    // socket.on('sentLikeForReciever', handleSentLikeForReciever);
    socket.on('setLastMessageForUsers', handleSetLastMessageForUsers);

    return () => {
      // socket.off('sentLikeForReciever', handleSentLikeForReciever);
      socket.off('setLastMessageForUsers', handleSetLastMessageForUsers);
    };
  }, []);
};
