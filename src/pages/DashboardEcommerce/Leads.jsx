import React, { useEffect, useState } from 'react';
import { Grid2, Paper, Typography } from '@mui/material';
import { borderRadius, Box, padding, styled } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { FilterAltOutlined } from '@mui/icons-material';

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#f8f8f8',
    borderRadius: '12px',
}));

const Leads = () =>{
const [leads, setLeads] = useState([])
const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

const options = {
    chart: { type: 'line', toolbar: { show: false } },
    dataLabels: {
        enabled: true, background: {
            borderRadius: "100%",
        },
    },
    stroke: { curve: 'monotoneCubic', width: 3, lineCap: "round" },
    xaxis: { categories: leads?.month ?? [] },
    colors: ['#66bb6a', '#ef5350', '#26c6da', '#ab47bc'],
    legend: { position: 'top' },
    grid: { show: true }
};
   useEffect(() => {
          fetchLeads()
      }, [])
  
      const fetchLeads = async () => {
          try {
              const data = await axios.get(`${api.API_URL}/dashboard/leads`, config)
              if (data) {
                  setLeads(data)
              }
              
              else{
                setLeads([])
              } 
          } catch (error) {
              toast.error("Unable to fetch Live User By Country")
              console.log("error", error)
          }
      }
    return(
    <Paper sx={{ height: '500px', background: "white" }}>
        <ToastContainer/>
        <Box sx={{ p: 1, backgroundColor: '#9882e7' }}>
            <Typography sx={{marginLeft:"10px",fontSize:"1rem"}} color="white"><FilterAltOutlined sx={{marginLeft:"10px"}}/> Leads</Typography>
        </Box>
        <ReactApexChart options={options} series={leads?.leads ?? []} type="line" height="80%" />
    </Paper>
);
} 

export default Leads;