import axios from "axios";
import { toast } from "react-toastify";

export const downloadReport = async (token, url, data, filename) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },

    responseType: 'blob',
  };

  const formData = new FormData();
  Object.keys(data).map(key => {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  })

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

export  const formatToDDMMYY=(input)=> {
  const date = new Date(input);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()); 
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const iconStyle={
  primary:{backgroundColor:"#405189",padding:"6px 8px",borderRadius:5},
  secondary:{backgroundColor:"#7e7cba",padding:"6px 8px",borderRadius:5},
  ternary:{backgroundColor:"#299cdb",padding:"6px 8px",borderRadius:5}
}