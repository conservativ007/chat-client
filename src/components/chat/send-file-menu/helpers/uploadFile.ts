import axios from 'axios';
import { CONSTANTS } from '../../../../constants';
import { getFileExtention } from './getFileExtention';

export const uploadFile = (file: File, token: string) => {
  let data = getFileExtention(file);
  if (data === undefined) return;

  const fileName = data.type === 'file' ? 'any-file' : 'image';

  const formData = new FormData();
  formData.append(fileName, file);

  const URL = data.type === 'file' ? CONSTANTS.SEND_FILE : CONSTANTS.SEND_IMAGE;

  return axios
    .post(URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((err) => console.error(err));
};
