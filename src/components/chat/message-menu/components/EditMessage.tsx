import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IMessage } from '../../../../models/IMessage';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { divInputRef } from '../../chat-form/chat-form/ChatForm';
import { divEditRef } from '../../chat-form/edit-button/Edit';
import { svgEdit } from '../index';

export const EditMessage = () => {
  const dispatch = useAppDispatch();

  const { setMessageActionEdit, setMessageWichEdit } =
    privateMessageSlice.actions;

  const { editMessage } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const handleEditMessage = () => {
    // insert message in input for edit
    openEditorOfMessage(editMessage);

    dispatch(setMessageActionEdit(true));
    dispatch(setMessageWichEdit(editMessage));
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

  if (editMessage.message.length > 0) {
    return (
      <div onClick={handleEditMessage} className="message-settings__edit">
        <img src={svgEdit} alt="" />
        <p>edit</p>
      </div>
    );
  }

  return <p></p>;
};
