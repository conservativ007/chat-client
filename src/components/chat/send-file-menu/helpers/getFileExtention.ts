interface IDataExtention {
  extention: string;
  type: 'image' | 'file';
}

export const getFileExtention = (selectedFile: File | null) => {
  if (selectedFile === null) {
    console.error('the file === NULL');
    return;
  }

  const getExtention = (file: File) => {
    const extention = file.name.split('.')[1];
    return extention;
  };

  const checkImageExtention = (ext: string) => {
    const extentions = 'png|jpeg|jpg|ico|svg';

    if (extentions.includes(ext) === true) {
      return true;
    }
    return false;
  };

  const extention = getExtention(selectedFile);
  const getNameString = () => {
    // if (extention === undefined) return;

    const isImage = checkImageExtention(extention);
    if (isImage === true) return 'image';
    return 'file';
  };

  const data: IDataExtention = {
    extention,
    type: getNameString(),
  };

  return data;
};
