import { CONSTANTS } from '../../../../constants';

export const downloadFile = async (
  fileId: number,
  filename: string,
  token: string
) => {
  const response = await fetch(CONSTANTS.GET_FILE + `/${fileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = await response.blob();

  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  downloadLink.click();
};
