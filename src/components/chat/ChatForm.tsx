import { socket } from '../../socket';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/IMessage';
import '../../style/chat.scss';
import { SendButton } from './SendButton';

import { ShowEmoji } from './emoji/ShowEmoji';
import { Emoji } from './emoji/Emoji';

export let divInputRef: any;

export const ChatForm = (): JSX.Element => {
  const [message, setMessage] = useState<string | null>('');
  const [inputWidth, setInputWidth] = useState<number>(500);
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const { myself } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { sizeOfInputText, marginOfMessageContainer } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

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
    let textCorrected = setCorrectMessage();
    let inputMessage = divInputRef.current;

    if (textCorrected === undefined) return;
    if (inputMessage === null) return;

    let message: IMessage = {
      message: textCorrected,
      senderName: myself.login,
      receiverName: userForPrivateMessage.login,
    };

    if (userForPrivateMessage.login === 'all') {
      socket.emit('createMessageForAllChat', message);
    } else {
      socket.emit('createPrivateMessage', message);
    }
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
      <div
        ref={divInputRef}
        className="chat-form__text-input"
        onKeyUp={handleOnKeyUp}
        contentEditable={true}
        onInput={(e) => setMessage(e.currentTarget.textContent)}
      ></div>
      <div className="chat-form__send-button" onClick={sendMessage}>
        <SendButton />
      </div>
      {isPickerVisible && <Emoji setMessage={setMessage} />}
    </div>
  );
};
