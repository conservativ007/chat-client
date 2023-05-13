import { IMessage } from '../../../../models/IMessage';
import './edit.scss';
import editSvgTwo from './editTwo.svg';

import { divInputRef } from '../../chat-form/ChatForm';
import { divEditRef } from '../../chat-form/edit-button/Edit';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { useEffect } from 'react';
import { socket } from '../../../../socket';
import { EMITS } from '../../../../constants/emits';

type AppProps = {
  message: IMessage;
};

export const MessageEditor = ({ message }: AppProps) => {
  const dispatch = useAppDispatch();
  const { setMessageActionEdit, setMessageWichEdit, updateMessage } =
    privateMessageSlice.actions;

  const { myself } = useAppSelector((state) => state.userReducer);

  const openEditorOfMessage = () => {
    let elemOfInputRef: HTMLDivElement = divInputRef.current;

    let elemOfEditContainerRef: HTMLDivElement = divEditRef.current;
    elemOfEditContainerRef.style.display = 'block';

    let elem = elemOfEditContainerRef.querySelector('.edit-text');

    if (elem === null) return;
    elem.innerHTML = message.message;

    // focus is working but put into start field for typing...
    // elemOfInputRef.focus();
    elemOfInputRef.innerHTML = message.message;

    // console.log(message);

    dispatch(setMessageActionEdit(true));
    dispatch(setMessageWichEdit(message));
  };

  useEffect(() => {
    const handleUpdatedMessageForUsers = (response: any) => {
      console.log(response);

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

  if (message.senderName !== myself.login) {
    return <></>;
  }

  return (
    <div className="message-settings__container">
      <div onClick={openEditorOfMessage} className="edit">
        <img src={editSvgTwo} alt="" />
      </div>
    </div>
  );
};
