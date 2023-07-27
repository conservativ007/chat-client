import { useFileContext } from '../../../context/FileContext';
import { bytesToMegabytes } from '../helpers/bytesToMegabytes';
import { getFileExtention } from '../helpers/getFileExtention';
import './file.css';

export const BodyFile = () => {
  const { selectedFile } = useFileContext();

  const data = getFileExtention(selectedFile);

  if (data === undefined) {
    console.error('data === undefined');
    return <div></div>;
  }

  if (data.type === 'image') {
    return (
      <div className="body">
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected Image"
            style={{ width: '310px', height: 'auto' }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="body">
      <div className="file-container corner">
        <p>{data.extention}</p>
      </div>
      <div className="file-info">
        <p className="name">{selectedFile?.name}</p>
        <p className="size">
          {selectedFile && bytesToMegabytes(selectedFile?.size)} mb
        </p>
      </div>
    </div>
  );
};
