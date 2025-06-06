import axios from "axios";
import { toast } from "react-toastify";
import { updateLoading } from "../slices/auth/login/reducer";
import { Campaign, CloudDownload, DownloadForOfflineRounded, Drafts, EmailRounded, MarkEmailRead, PanToolAlt } from "@mui/icons-material";

export const downloadReport = async (token, url, data, filename,dispatch) => {
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
  dispatch && dispatch(updateLoading(true))
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
    dispatch && dispatch(updateLoading(false))
    toast.success('Report downloaded.');
  } catch (error) {
    toast.error('Unable to fetch reports');
    console.error('Error:', error);
    dispatch && dispatch(updateLoading(false))
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

export const getCurrentTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

export const truncateWords = (text, wordLimit = 5) => {
  const words = text.trim().split(/\s+/);
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
};

export const iconStyle={
  primary:{backgroundColor:"#405189",padding:"6px 8px",borderRadius:5},
  secondary:{backgroundColor:"#7e7cba",padding:"6px 8px",borderRadius:5},
  ternary:{backgroundColor:"#299cdb",padding:"6px 8px",borderRadius:5},
  dashboardHeader:{padding:'1rem',paddingLeft:'2rem',borderRadius:"20px 20px 0 0",fontWeight:"bold",fontSize:"22px",color:'#252525',fontWeight:'400'}}

export const getIcon = (name, size) => {
  switch (name) {
    case "Email": return <EmailRounded sx={{ fontSize: size ?? "2rem" }} />
    case "PanToolAlt": return <PanToolAlt sx={{ fontSize: size ?? "2rem" }} />
    case "Drafts": return <Drafts sx={{ fontSize: size ?? "2rem" }} />
    case "DownloadForOfflineRounded": return <DownloadForOfflineRounded sx={{ fontSize: size ?? "2rem" }} />
    case "CampaignIcon": return <Campaign sx={{ fontSize: size ?? "2rem" }} />
    case "MarkEmailRead": return <MarkEmailRead sx={{ fontSize: size ?? "2rem" }} />
    case "CloudDownloadIcon": return <CloudDownload sx={{ fontSize: size ?? "2rem" }} />

    default: return <Drafts />
      break;
  }
}