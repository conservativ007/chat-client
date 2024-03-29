import axios, { AxiosResponse } from 'axios';
import { CONSTANTS } from '../../../../constants';

export interface UploadFileResponse {
  type: 'file';
  fileId: number;
  fileName: string;
  // fileSize: string;
}

export const uploadFile = async (
  file: File,
  token: string
): Promise<UploadFileResponse> => {
  const fileName = 'any-file';

  const formData = new FormData();
  formData.append(fileName, file);

  const URL = CONSTANTS.SEND_FILE;

  try {
    const response: AxiosResponse<UploadFileResponse> = await axios.post(
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
