import axios from 'axios';
import { useAppSelector } from '../../../../hooks/redux';
import { CONSTANTS } from '../../../../constants/constants';
import { socket } from '../../../../socket';
import { IMessage } from '../../../../models/IMessage';

import likeSvg from './like.svg';
import { useLike } from '../../../../hooks/useLike';
import { EMITS } from '../../../../constants/emits';

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
      senderName: myself.login,
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
        // and private messages
        let { data } = response;

        socket.emit(EMITS.SET_LIKE_TO_MESSAGE, data);
      })
      .catch((err) => console.error(err));
  };

  const classNameForLikeButton =
    myself.login === message.senderName ? 'sender' : 'reciever';

  return (
    <>
      <span
        onClick={() => setLike(message.id)}
        className={`message-like__button ${classNameForLikeButton}`}
      >
        <img src={likeSvg} alt="heart" />
      </span>
      {message.likeCount > 0 && (
        <>
          <span className={`message-like__view ${classNameForLikeButton}`}>
            <img src={likeSvg} alt="heart" />
          </span>
          <span className={`message-like__count ${classNameForLikeButton}`}>
            {message.likeCount}
          </span>
        </>
      )}
    </>
  );
};
