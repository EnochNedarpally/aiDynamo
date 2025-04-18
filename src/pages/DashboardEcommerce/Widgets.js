import { Card, CardContent, Grid2, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { MarkEmailRead } from "@mui/icons-material";

const Widgets = () => {
  const cards = [
    { label: "Campaigns", value: "679", icon: <CampaignIcon />, color: "#e34d88",color2:"#9f468b" },
    { label: "Email sent", value: "560674", icon: <EmailIcon />, color: "#9168d0",color2:"#5947b3" },
    { label: "Email read", value: "159891", icon: <MarkEmailRead />, color: "#45c3f2",color2:"#5582b6" },
    { label: "Download", value: "88863", icon: <CloudDownloadIcon />, color: "#ffb634",color2:"#f68654" },
  ];

  return (
    <div className="w-100 d-flex gap-3">
      {cards.map((card, index) => (
          <Card key={card.label} sx={{flex:1,padding:"0px",borderRadius:"10px"}}>
            <CardContent style={{padding:"10px 14px", background: `linear-gradient(90deg, ${card.color} 0%, ${card.color} 50%, ${card.color2}`, color: "#ffffff"}} >
              <Typography color="white" variant="h6">{card.label}</Typography>
            <div className="d-flex justify-content-between align-items-center">
              <Typography color="white" variant="h6" className="m-0 p-0">{card.value}</Typography>
              {card.icon}
            </div>
            </CardContent>
          </Card>
      ))}
    </div>
  );
};

export default Widgets;