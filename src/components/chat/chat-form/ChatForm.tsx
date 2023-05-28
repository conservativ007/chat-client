import { socket } from '../../../socket';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { SendButton } from './send-button/SendButton';
import { ShowEmoji } from '../emoji/ShowEmoji';
import { Emoji } from '../emoji/Emoji';

import './chat.scss';
import { Edit } from './edit-button/Edit';
import { useEditMessage } from '../../../hooks/useEditMessage';
import { EMITS } from '../../../constants/emits';
import axios from 'axios';
import { CONSTANTS } from '../../../constants/constants';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';

import { IPreMessage } from '../../../models/IPreMessage';

export let divInputRef: any;

export const ChatForm = (): JSX.Element => {
  const [message, setMessage] = useState<string | null>('');
  const [inputWidth, setInputWidth] = useState<number>(500);
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const { myself, userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

  const { isMessageEdit } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { sizeOfInputText, marginOfMessageContainer } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { setPrivateMessage } = privateMessageSlice.actions;

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

  const sendMessage = () => {
    if (isMessageEdit === true) {
      getUseEditMess();
      return;
    }
    let textCorrected = setCorrectMessage();
    let inputMessage = divInputRef.current;

    if (textCorrected === undefined) return;
    if (inputMessage === null) return;

    let message: IPreMessage = {
      message: textCorrected,
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
      senderId: myself.id,
      receiverId: userForPrivateMessage.id,
    };
    let url: string;
    let emit: string;

    if (userForPrivateMessage.login === 'all') {
      url = CONSTANTS.CREATE_MESSAGE_FOR_GENERAL_CHAT;
      emit = EMITS.CREATE_MESSAGE_FOR_GENERAL_CHAT;
    } else {
      url = CONSTANTS.CREATE_PRIVATE_MESSAGE;
      emit = EMITS.CREATE_PRIVATE_MESSAGE;
    }

    axios
      .post(url, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 201) return;
        socket.emit(emit, response.data);

        if (userForPrivateMessage.login !== 'all') {
          // save message for myself
          dispatch(setPrivateMessage(response.data));
        }
      });

    setMessage('');
    inputMessage.innerHTML = '';
  };

  // change resize of inputText
  useEffect(() => {
    const num = Number(sizeOfInputText) - 5;
    setInputWidth(num);
  }, [sizeOfInputText]);

  const handleOnKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    let key = event.key;
    if (key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div
      className="chat-form"
      style={{
        left: `${marginOfMessageContainer}px`,
        width: `${inputWidth}px`,
      }}
    >
      <ShowEmoji setPickerVisible={setPickerVisible} />
      <Edit inputWidth={inputWidth} />
      <div
        ref={divInputRef}
        className="chat-form__text-input"
        onKeyUp={handleOnKeyUp}
        contentEditable={true}
        onInput={(e) => setMessage(e.currentTarget.textContent)}
      ></div>
      <SendButton sendMessage={sendMessage} />
      {isPickerVisible && <Emoji setMessage={setMessage} />}
    </div>
  );
};
