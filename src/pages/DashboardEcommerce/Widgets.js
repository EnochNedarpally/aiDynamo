import { Box, Card, CardContent, Grid2, Paper, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Drafts, MarkEmailRead } from "@mui/icons-material";
import axios from "axios";
import { api } from "../../config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIcon } from "../../helpers/helper_utils";
import CountUp from "react-countup";

const Widgets = () => {
   const [widgets, setWidgets] = useState([]);
      const token = useSelector(state => state.Login.token)
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      };
      useEffect(() => {
          fetchWidgets()
      }, [])
  
      const fetchWidgets = async () => {
          try {
              const data = await axios.get(`${api.API_URL}/dashboard/email-activity`, config)
              if (data) {
                  setWidgets(data ?? [])
              }
              else toast.error("Unable to fetch Accounts")
          } catch (error) {
              toast.error("Unable to fetch Accounts")
              console.log("error", error)
          }
      }
  const cards = [
    { label: "Campaigns", value: "679", icon: <CampaignIcon sx={{fontSize:'4rem'}}/>, },
    { label: "Email sent", value: "560674", icon: <MarkEmailRead sx={{fontSize:'4rem'}}/>,  },
    { label: "Download", value: "88863", icon: <CloudDownloadIcon sx={{fontSize:'4rem'}}/>, },
    { label: "Email read", value: "159891", icon: <Drafts sx={{fontSize:'4rem'}}/>, },
  ];

  return (
    <Paper sx={{ perspective: "1000px",width:"100%",gap:2,display:"flex",padding:'2rem 0.7rem',justifyContent:"center",alignItems:"center"}}>
      {widgets.map((card, index) => (
          <Box key={card.label} 
          sx={{
            flex: 1,
            borderRadius: "10px",
            textAlign:"center",
          }}
          >
            <Box style={{padding:"10px 14px",color:"#8a8a8a"}} >
              {getIcon(card.icon,"3rem")}
              <Typography my={2} color="black" variant="subtitle1">{card.label}</Typography>
            <div>
              
              <Typography fontWeight="bold" color="black" variant="h5" className="m-0 p-0">
                <CountUp
                  start={0}
                  end={card.value}
                  duration={4}
              /></Typography>
            </div>
            </Box>
          </Box>
      ))}
    </Paper>
  );
};

export default Widgets;