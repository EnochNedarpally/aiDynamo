import axios from "axios";
import { toast } from "react-toastify";

export const downloadReport = async (token, url, formData, filename) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },

    responseType: 'blob',
  };

  try {
    const res = await axios.post(
      url,
      formData,
      config
    );
    const blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    toast.success('Report downloaded.');
  } catch (error) {
    toast.error('Unable to fetch reports');
    console.error('Error:', error);
  }
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}