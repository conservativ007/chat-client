import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './index.scss';
import { sendFileSlice } from '../../../store/reducers/SendFileSlice';
import { useFileContext } from '../../context/FileContext';
import { uploadFile } from './helpers/uploadFile';
import { sendMessageWithFile } from './helpers/sendMessageWithFile';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';
import { BodyFile } from './body-file/BodyFile';
import { HeaderFile } from './header-file/Header-file';
import { createNewMessage } from './helpers/createNewMessage';
import { getFileExtention } from './helpers/getFileExtention';
import { uploadImage } from './helpers/uploadImage';

export const SendFileMenu = () => {
  const { selectedFile } = useFileContext();

  const { isFileAttach } = useAppSelector((state) => state.sendFileReducer);

  const { token, myself, userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const dispatch = useAppDispatch();
  const { resetFileState } = sendFileSlice.actions;
  const { setPrivateMessage } = privateMessageSlice.actions;

  const handleClose = () => {
    dispatch(resetFileState());
  };

  const handleSendFile = async () => {
    if (selectedFile === null) {
      console.error('selectedFile is NULL');
      return;
    }
    let type;

    let data = getFileExtention(selectedFile);
    if (data === undefined) {
      console.error('data === undefined');
      return;
    }

    if (data.type === 'file') type = await uploadFile(selectedFile, token);
    if (data.type === 'image') type = await uploadImage(selectedFile, token);

    // console.log(type);

    const newMessage = createNewMessage(
      userForPrivateMessage,
      myself,
      type,
      selectedFile
    );
    if (newMessage === undefined) {
      console.error('newMessage === undefined');
      return;
    }

    // console.log(newMessage);

    let response = await sendMessageWithFile(newMessage, token);
    // console.log(response);

    if (userForPrivateMessage.login !== 'all' && response !== undefined) {
      dispatch(setPrivateMessage(response.data));
    }
    handleClose();
  };

  if (isFileAttach !== false) {
    return (
      <div className="send-file-menu">
        <HeaderFile />
        <BodyFile />
        <div onClick={handleSendFile} className="send-file-button">
          send
        </div>
      </div>
    );
  }

  return <div></div>;
};
