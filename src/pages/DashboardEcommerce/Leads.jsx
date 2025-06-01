import React from 'react';
import { Grid2, Paper, Typography } from '@mui/material';
import { borderRadius, Box, padding, styled } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#f8f8f8',
    borderRadius: '12px',
}));

const series = [
    {
        name: 'Download Rate',
        data: [5, 8, 10, 15, 18, 20],
    },
    {
        name: 'Open Rate',
        data: [8, 10, 12, 18, 25, 24],
    },
    {
        name: 'Email Sent',
        data: [12, 14, 15, 22, 30, 32],
    },
    {
        name: 'Click Rate',
        data: [15, 20, 22, 25, 32, 35],
    },
];

const options = {
    chart: { type: 'line', toolbar: { show: false } },
    dataLabels: {
        enabled: true, background: {
            borderRadius: "100%",
        },
    },
    stroke: { curve: 'monotoneCubic', width: 3, lineCap: "round" },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'] },
    colors: ['#66bb6a', '#ef5350', '#26c6da', '#ab47bc'],
    legend: { position: 'top' },
    grid: { show: true }
};

const Leads = () => (
    <Paper sx={{ height: '500px', background: "white" }}>
        <Box sx={{ p: 2, backgroundColor: '#b388eb' }}>
            <Typography variant="h6" color="white">Leads</Typography>
        </Box>
        <ReactApexChart options={options} series={series} type="line" height="80%" />
    </Paper>
);

export default Leads;