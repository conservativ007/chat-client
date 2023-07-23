import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './index.scss';
import { sendFileSlice } from '../../../store/reducers/SendFileSlice';
import { useFileContext } from '../../context/FileContext';
import { uploadFile } from './helpers/uploadFile';
import { sendEmptyMessage } from './helpers/sendEmptyMessage';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';

export const SendFileMenu = () => {
  const { selectedFile } = useFileContext();

  const { isFileAttach, fileName } = useAppSelector(
    (state) => state.sendFileReducer
  );

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
    const data = await uploadFile(selectedFile, token);
    console.log(data);

    let newMessage = {
      receiverId: userForPrivateMessage.id,
      receiverName: userForPrivateMessage.login,
      senderId: myself.id,
      senderName: myself.login,
      imageSrc: String(data?.data),
      message: '',
    };

    let response = await sendEmptyMessage(newMessage, token);

    if (userForPrivateMessage.login !== 'all' && response !== undefined) {
      dispatch(setPrivateMessage(response.data));
    }
    handleClose();
  };

  if (isFileAttach !== false) {
    return (
      <div className="send-file-menu">
        <header>
          <div onClick={handleClose} className="close-menu"></div>
          <div className="file-menu">{fileName}</div>
        </header>
        <div className="body">
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Image"
              style={{ width: '310px', height: 'auto' }}
            />
          )}
        </div>
        <div onClick={handleSendFile} className="send-file-button">
          send
        </div>
      </div>
    );
  }

  return <div></div>;
};
