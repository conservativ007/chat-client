import { useRef } from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import button from './button.svg';
import './index.scss';
import { sendFileSlice } from '../../../../store/reducers/SendFileSlice';
import { useFileContext } from '../../../context/FileContext';

export const AttachFileButton = () => {
  const { setSelectedFile } = useFileContext();
  const imgRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { setFileName, setFileType, setFileSize, setFileAttach } =
    sendFileSlice.actions;

  const handleClick = () => {
    let elem = imgRef.current as HTMLInputElement;
    elem.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files?.[0];

    if (selectedFile === undefined) return;

    dispatch(setFileAttach(true));
    dispatch(setFileName(selectedFile.name));
    dispatch(setFileType(selectedFile.type));
    dispatch(setFileSize(selectedFile.size));
    setSelectedFile(selectedFile);
  };

  return (
    <div className="attach-file">
      <input
        onChange={handleChange}
        ref={imgRef}
        type="file"
        className="hidden"
      />
      <img onClick={handleClick} src={button} alt="clip" />
    </div>
  );
};
