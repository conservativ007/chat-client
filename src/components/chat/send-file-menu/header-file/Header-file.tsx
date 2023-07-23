import { useAppDispatch } from '../../../../hooks/redux';
import { sendFileSlice } from '../../../../store/reducers/SendFileSlice';
import { useFileContext } from '../../../context/FileContext';
import { getFileExtention } from '../helpers/getFileExtention';

export const HeaderFile = () => {
  const { selectedFile } = useFileContext();

  const dispatch = useAppDispatch();
  const { resetFileState } = sendFileSlice.actions;

  const data = getFileExtention(selectedFile);

  if (data === undefined) {
    console.error('data === undefined');
    return <div></div>;
  }

  return (
    <header>
      <div
        onClick={() => dispatch(resetFileState())}
        className="close-menu"
      ></div>
      <div className="file-menu">Send {data.type}</div>
    </header>
  );
};
