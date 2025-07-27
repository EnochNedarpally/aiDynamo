import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { api } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Diversity3Outlined } from "@mui/icons-material";

const CountriesSession = () => {
  const [countrySession, setCountrySession] = useState([]);
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  useEffect(() => {
    fetchCountrySession()
  }, [])

  const fetchCountrySession = async () => {
    try {
      const data = await axios.get(`${api.API_URL}/dashboard/sessions-by-country`, config)
      if (data?.countries) {
        setCountrySession(data)
      }
    } catch (error) {
      toast.error("Unable to fetch Country Session")
      console.log("error", error)
    }
  }
  const series = [{
    name: 'Sessions',
    data: countrySession?.sessions ?? [],
  }];

  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: {
      categories: countrySession?.countries ?? [],
    },
    grid: {
      show: true,
      borderColor: '#21130d',
      strokeDashArray: 4,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        }
      },
      yaxis: {
        lines: {
          show: true,
        }
      }
    },
    colors: ['#e28743', "#063970"],
  };
  return (
    <Paper sx={{ height: '400px', background: "white" }}>
      <ToastContainer />
      <Box sx={{ p: 1, backgroundColor: '#9882e7' }}>
        <Typography sx={{marginLeft:"10px",fontSize:"1rem"}}  color="white"><Diversity3Outlined sx={{marginLeft:"10px"}}/> Session By Continents</Typography>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={"80%"} />
    </Paper>
  );
};

export default CountriesSession;
