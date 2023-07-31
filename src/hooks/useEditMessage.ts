import axios from 'axios';
import { useAppDispatch, useAppSelector } from './redux';
import { privateMessageSlice } from '../store/reducers/PrivateMessageSlice';
import { divInputRef } from '../components/chat/chat-form/chat-form/ChatForm';
import { IMessage } from '../models/IMessage';
import { CONSTANTS } from '../constants/constants';
import { EMITS } from '../constants/emits';
import { socket } from '../socket';
import { divEditRef } from '../components/chat/chat-form/edit-button/Edit';

export const useEditMessage = () => {
  const dispatch = useAppDispatch();
  const { updateMessage, setMessageActionEdit } = privateMessageSlice.actions;

  const { editMessage } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const { token } = useAppSelector((state) => state.userReducer);

  const updateMessageForMyself = () => {
    let messageInputRef: HTMLDivElement = divInputRef.current;
    let editMessageRef: HTMLDivElement = divEditRef.current;

    let newTextForAnEditMessage = messageInputRef.innerText.trim();

    const editedMessage: IMessage = {
      ...editMessage,
      message: newTextForAnEditMessage,
    };

    if (editedMessage.receiverName !== 'all') {
      // for myself and reciever
      editMessForMySelf(editedMessage, editMessageRef, messageInputRef);
      return;
    }

    editForGeneralChat(editedMessage, editMessageRef, messageInputRef);
  };

  const editMessForMySelf = (
    editedMessage: IMessage,
    editMessageRef: HTMLDivElement,
    messageInputRef: HTMLDivElement
  ) => {
    axios
      .post(CONSTANTS.PRIVATE_MESSAGE_EDIT, editedMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // update message for reciever

        // console.log(response.data);

        const data = response.data;
        socket.emit(EMITS.UPDATE_PRIVATE_MESSAGE, data);

        // update message for myself
        dispatch(updateMessage(response.data));
        dispatch(setMessageActionEdit(false));

        // hide edit field and clear input message
        editMessageRef.style.display = 'none';
        messageInputRef.innerHTML = '';
      });
  };

  const editForGeneralChat = (
    editedMessage: IMessage,
    editMessageRef: HTMLDivElement,
    messageInputRef: HTMLDivElement
  ) => {
    axios
      .post(CONSTANTS.GENERAL_CHAT_MESSAGE_EDIT, editedMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // change message for reciever
        const data = response.data;
        socket.emit(EMITS.UPDATE_MESSAGE_FOR_GENERAL_CHAT, data);

        dispatch(setMessageActionEdit(false));

        // hide edit field and clear input message
        editMessageRef.style.display = 'none';
        messageInputRef.innerHTML = '';
      });
  };

  return updateMessageForMyself;
};
