import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { deleteMessageForGeneralChat } from '../helpers/deleteMessageForGeneralChat';
import { deleteMessageForOneUser } from '../helpers/deleteMessageForOneUser';
import { svgDelete } from '../index';

export const DeleteMessage = () => {
  const dispatch = useAppDispatch();
  const { deleteMessage } = privateMessageSlice.actions;

  const { userForPrivateMessage, token } = useAppSelector(
    (state) => state.userReducer
  );

  const { editMessage } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const handlerDeleteMessage = () => {
    if (userForPrivateMessage.login !== 'all') {
      deleteMessageForOneUser(editMessage, userForPrivateMessage, token);
      // delete for myself from redux
      dispatch(deleteMessage(editMessage.id));
    } else {
      deleteMessageForGeneralChat(editMessage, token);
    }
  };

  return (
    <div onClick={handlerDeleteMessage} className="message-settings__delete">
      <img src={svgDelete} alt="" />
      <p>delete</p>
    </div>
  );
};
