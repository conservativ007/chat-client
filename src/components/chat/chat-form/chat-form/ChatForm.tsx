import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import { SendButton } from '../send-button/SendButton';
import { ShowEmoji } from '../../emoji/ShowEmoji';
import { Emoji } from '../../emoji/Emoji';

import './chat-form.scss';
import { Edit } from '../edit-button/Edit';
import { useEditMessage } from '../../../../hooks/useEditMessage';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';

import { IPreMessage } from '../../../../models/IPreMessage';
import { AttachFileButton } from '../attach-file-button/AttachFileButton';
import { sendMessage } from '../../helpers/sendMessage';

export let divInputRef: any;

export const ChatForm = (): JSX.Element => {
  const [message, setMessage] = useState<string | null>('');
  const [inputWidth, setInputWidth] = useState<number>(500);

  const { myself, userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

  const { isMessageEdit, isEmojiShow } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { sizeOfInputText, sizeOfMessageContainer } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { setPrivateMessage, setIsEmojiShow } = privateMessageSlice.actions;

  const getUseEditMess = useEditMessage();

  const dispatch = useAppDispatch();

  divInputRef = useRef<HTMLDivElement | null>(null);

  const setCorrectMessage = () => {
    if (message === null) return;
    const arrText = message.split(' ');
    return arrText
      .map((letter, index) => {
        if (index > 1 && index % 10 === 0) {
          return `${letter}\n`;
        }
        return letter;
      })
      .join(' ');
  };

  const sendMessageNewMessage = async () => {
    if (isMessageEdit === true) {
      getUseEditMess();
      return;
    }

    if (message === null || message.length === 0) return;
    let textCorrected = setCorrectMessage();
    let inputMessage = divInputRef.current;

    if (textCorrected === undefined) return;
    if (inputMessage === null) return;

    let newMessage: IPreMessage = {
      message: textCorrected,
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
      senderId: myself.id,
      receiverId: userForPrivateMessage.id,
      imageSrc: '',
    };

    let response = await sendMessage(
      userForPrivateMessage.login,
      token,
      newMessage
    );

    if (userForPrivateMessage.login !== 'all' && response !== undefined) {
      dispatch(setPrivateMessage(response.data));
    }

    setMessage('');
    inputMessage.innerHTML = '';
    dispatch(setIsEmojiShow(false));
  };

  // change resize of inputText
  useEffect(() => {
    const num = Number(sizeOfInputText) - 5;
    setInputWidth(num);
  }, [sizeOfInputText]);

  if (userForPrivateMessage.login === '') {
    return <div></div>;
  }

  return (
    <div
      className="chat-form"
      style={{
        width: `${Number(sizeOfMessageContainer - 10)}px`,
      }}
    >
      <ShowEmoji />
      <AttachFileButton />
      <Edit inputWidth={inputWidth} />
      <div
        ref={divInputRef}
        className="chat-form__text-input"
        // onKeyUp={handleOnKeyUp}
        contentEditable={true}
        onInput={(e) => setMessage(e.currentTarget.textContent)}
      ></div>
      <SendButton sendMessage={sendMessageNewMessage} />
      {isEmojiShow && <Emoji setMessage={setMessage} />}
    </div>
  );
};
