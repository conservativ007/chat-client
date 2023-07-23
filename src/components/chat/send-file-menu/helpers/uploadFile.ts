import axios from 'axios';
import { CONSTANTS } from '../../../../constants';

export const uploadFile = (file: File | null, token: string) => {
  if (file === null) return;

  const formData = new FormData();
  formData.append('image', file);

  const data = axios
    .post(CONSTANTS.SEND_IMAGE, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((err) => console.error(err));

  return data;
};
