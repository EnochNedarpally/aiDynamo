import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { Box, display, styled } from '@mui/system';
import { Email, EmailRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { getIcon } from '../../helpers/helper_utils';

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#f8f8f8',
    borderRadius: '12px',
}));

const EmailActivity = () =>{
const [emailActivity, setEmailActivity] = useState([])
const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

   useEffect(() => {
          fetchEmailActivity()
      }, [])
  
      const fetchEmailActivity = async () => {
          try {
              const data = await axios.get(`${api.API_URL}/dashboard/email-activity-data`, config)
              if (data) {
                  setEmailActivity(data ?? [])
              }
              
          } catch (error) {
              toast.error("Unable to fetch Live User By Country")
              console.log("error", error)
          }
      }

    return(
    <Paper sx={{ height: '500px', background: "white" }}>
        <ToastContainer/>
        <Box sx={{ p: 2, backgroundColor: '#b388eb' }}>
            <Typography variant="h6" color="white">Email Activity</Typography>
        </Box>
        <Box sx={{width: "100%", height: "90%", padding: 2, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
            {emailActivity.map(email => (
                <Box key={email.label} sx={{ width: "45%", height: "35%",position:"relative"}}>
                     <Box key={email.label} sx={{ width: "100%", height: "100%",backgroundImage: `url("${process.env.PUBLIC_URL}/${email.label}.jpg")`,backgroundPosition:"center",backgroundSize:"cover",opacity:0.4,position:"absolute"}}/>
                     <Box key={email.label} sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly",paddingX:2}}>
                    <Box sx={{ width: "100",display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='subtitle1' fontWeight={"bold"}>{email.label}</Typography>
                        {getIcon(email.icon)}
                    </Box>
                    <Typography color='black' variant='subtitle1' fontSize={"2rem"} fontWeight={"bold"}>{email.value}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    </Paper>
);
} 

export default EmailActivity;