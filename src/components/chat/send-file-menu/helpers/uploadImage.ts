import axios, { AxiosResponse } from 'axios';
import { CONSTANTS } from '../../../../constants';

export interface UploadImageResponse {
  type: 'image';
  imageUrl: string;
}

export const uploadImage = async (
  file: File,
  token: string
): Promise<UploadImageResponse> => {
  const fileName = 'image';

  const formData = new FormData();
  formData.append(fileName, file);

  const URL = CONSTANTS.SEND_IMAGE;

  try {
    const response: AxiosResponse<UploadImageResponse> = await axios.post(
      URL,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
