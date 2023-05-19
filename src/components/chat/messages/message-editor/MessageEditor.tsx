import { IMessage } from '../../../../models/IMessage';
import './edit.scss';
import editSvg from './edit.svg';

import { divInputRef } from '../../chat-form/ChatForm';
import { divEditRef } from '../../chat-form/edit-button/Edit';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { useEdit } from './useEdit';
import { useDelete } from './useDelete';
import deleteImage from './delete.png';
import axios from 'axios';
import { CONSTANTS } from '../../../../constants/constants';
import { socket } from '../../../../socket';
import { EMITS } from '../../../../constants/emits';

type AppProps = {
  message: IMessage;
};

export const MessageEditor = ({ message }: AppProps) => {
  const dispatch = useAppDispatch();
  const { setMessageActionEdit, setMessageWichEdit, deleteMessage } =
    privateMessageSlice.actions;

  const { myself, userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

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

  const handlerDeleteMessage = () => {
    if (userForPrivateMessage.login !== 'all') {
      deleteMessageForOneUser();
    } else {
      deleteMessageForGeneralChat();
    }
  };

  const deleteMessageForGeneralChat = () => {
    axios
      .delete(`${CONSTANTS.GENERAL_CHAT_MESSAGE_DELETE}/${message.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 204) return;
        socket.emit(EMITS.DELETE_MESSAGE_FOR_GENERAL_CHAT, message.id);
      });
  };

  const deleteMessageForOneUser = () => {
    axios
      .delete(`${CONSTANTS.PRIVATE_MESSAGE_DELETE}/${message.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 204) return;

        // delete for myself
        dispatch(deleteMessage(message.id));

        // delete for reciever user
        const data = {
          recieverId: userForPrivateMessage.id,
          messageId: message.id,
        };
        socket.emit(EMITS.DELETE_PRIVATE_MESSAGE, data);
      });
  };

  useEdit();
  useDelete();

  if (message.senderName !== myself.login) {
    return <></>;
  }

  return (
    <div className="message-settings__container">
      <div onClick={openEditorOfMessage} className="edit">
        <img src={editSvg} alt="" />
      </div>
      <div onClick={handlerDeleteMessage} className="delete">
        <img src={deleteImage} alt="" />
      </div>
    </div>
  );
};
