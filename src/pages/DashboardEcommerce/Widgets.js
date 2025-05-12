import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
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
    <Box sx={{ perspective: "1000px",width:"100%",gap:2,display:"flex" }}>
      {cards.map((card, index) => (
          <Card key={card.label} 
          sx={{
            flex: 1,
            borderRadius: "10px",
            background: `linear-gradient(145deg, #1e1e1e, #2e2e2e)`,
            boxShadow: `
            6px 6px 10px rgb(80, 78, 78),
            0px 2px 5px #353535,
            inset 0 0px 2px rgba(255,255,255,0.05),
            inset 0 -1px 2px rgba(0,0,0,0.3)
            `,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transformStyle: "preserve-3d",
            transform: "rotateY(-10deg)",
            // transform: "perspective(1000px)",
            '&:hover': {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: `
                2px 2px 15px #191919,
                -1px -1px 10px #353535,
                inset 0 1px 2px rgba(255,255,255,0.07),
                inset 0 -1px 2px rgba(0,0,0,0.4)
              `
            },
            color: "#fff",
          }}
          >
            <CardContent style={{padding:"10px 14px", background: `linear-gradient(90deg, ${card.color} 0%, ${card.color} 50%, ${card.color2}`, color: "#ffffff"}} >
              <Typography color="white" variant="h6">{card.label}</Typography>
            <div className="d-flex justify-content-between align-items-center">
              <Typography color="white" variant="h6" className="m-0 p-0">{card.value}</Typography>
              {card.icon}
            </div>
            </CardContent>
          </Card>
      ))}
    </Box>
  );
};

export default Widgets;