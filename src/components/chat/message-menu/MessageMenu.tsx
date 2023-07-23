import './message-menu.scss';
import axios from 'axios';

import { svgCopy, svgDelete, svgEdit, useDelete, useEdit } from './index';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';

import { CONSTANTS, EMITS } from '../../../constants/index';
import { socket } from '../../../socket';
import { IMessage } from '../../../models/IMessage';
import { divInputRef } from '../chat-form/chat-form/ChatForm';
import { divEditRef } from '../chat-form/edit-button/Edit';
import { useToast } from '../../../hooks/useToast';

export const MessageMenu = () => {
  const dispatch = useAppDispatch();

  const getToast = useToast;

  const { showMessageMenu, left, top } = useAppSelector(
    (state) => state.messaggeMenuReducer
  );

  const { editMessage } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { setMessageActionEdit, setMessageWichEdit, deleteMessage } =
    privateMessageSlice.actions;

  const { userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

  const styles = {
    display: `${showMessageMenu === true ? 'flex' : 'none'}`,
    left: left,
    top: top - 50, // - header
  };

  const handleEditMessage = () => {
    // insert message in input for edit
    openEditorOfMessage(editMessage);

    dispatch(setMessageActionEdit(true));
    dispatch(setMessageWichEdit(editMessage));
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
      .delete(`${CONSTANTS.GENERAL_CHAT_MESSAGE_DELETE}/${editMessage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 204) return;
        socket.emit(EMITS.DELETE_MESSAGE_FOR_GENERAL_CHAT, editMessage.id);
      });
  };

  const deleteMessageForOneUser = () => {
    axios
      .delete(`${CONSTANTS.PRIVATE_MESSAGE_DELETE}/${editMessage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 204) return;

        // delete for myself
        dispatch(deleteMessage(editMessage.id));

        // delete for reciever user
        const data = {
          recieverId: userForPrivateMessage.id,
          messageId: editMessage.id,
        };
        socket.emit(EMITS.DELETE_PRIVATE_MESSAGE, data);
      });
  };

  const openEditorOfMessage = (message: IMessage) => {
    let elemOfInputRef: HTMLDivElement = divInputRef.current;

    let elemOfEditContainerRef: HTMLDivElement = divEditRef.current;
    elemOfEditContainerRef.style.display = 'block';

    let elem = elemOfEditContainerRef.querySelector('.edit-text');

    if (elem === null) return;
    elem.innerHTML = message.message;

    // focus is working but put into start field for typing...
    // elemOfInputRef.focus();
    elemOfInputRef.innerHTML = message.message;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editMessage.message);
      getToast(true, 'Copied!');
    } catch (e) {
      getToast(false, `something went wrong`);
    }
  };

  useEdit();
  useDelete();

  return (
    <div className="message-settings" style={styles}>
      <div onClick={handleCopy} className="message-settings__copy">
        <img src={svgCopy} alt="" />
        <p>copy</p>
      </div>
      <div onClick={handleEditMessage} className="message-settings__edit">
        <img src={svgEdit} alt="" />
        <p>edit</p>
      </div>
      <div onClick={handlerDeleteMessage} className="message-settings__delete">
        <img src={svgDelete} alt="" />
        <p>delete</p>
      </div>
    </div>
  );
};
