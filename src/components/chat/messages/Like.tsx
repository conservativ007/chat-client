import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';
import { CONSTANTS } from '../../../constants/constants';
import { socket } from '../../../socket';
import { IMessage } from '../../../models/IMessage';

import likeSvg from './like.svg';
import { useLike } from '../../../hooks/useLike';

type AppProps = {
  message: IMessage;
};

export const Like = ({ message }: AppProps) => {
  const { myself, userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

  useLike();

  const setLike = (messageId: string) => {
    const action = userForPrivateMessage.login === 'all' ? 'public' : 'private';

    const messageDto = {
      messageId,
      userName: myself.login,
      action,
    };

    axios
      .post(CONSTANTS.LIKE_MESSAGE, messageDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // here we are update the messages for general chat
        if (userForPrivateMessage.login === 'all') {
          let { data } = response;

          // for others
          socket.emit('lastMessageForUsers', data);
        } else {
        }
      })
      .catch((err) => console.error(err));
  };

  const likeViewStyleForMySelf = {
    top: '-5px',
    left: '-5px',
  };

  const likeViewStyleForOthers = {
    top: '-5px',
    right: '-5px',
  };

  const styles =
    myself.login === message.senderName
      ? likeViewStyleForMySelf
      : likeViewStyleForOthers;

  return (
    <>
      <span
        onClick={() => setLike(message.id)}
        className="message-like__button"
      >
        <img src={likeSvg} alt="heart" />
      </span>
      {message.likeCount > 0 && (
        <>
          <span className="message-like__view" style={styles}>
            <img src={likeSvg} alt="heart" />
          </span>
          <span style={styles} className="message-like__count">
            {message.likeCount}
          </span>
        </>
      )}
    </>
  );
};
