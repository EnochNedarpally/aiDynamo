import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box, display, styled } from '@mui/system';
import { Email } from '@mui/icons-material';

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#f8f8f8',
    borderRadius: '12px',
}));

const emailStats = [
    { label: 'Email Sent', value: 208562 },
    { label: 'Click Rate', value: 75082 },
    { label: 'Open Rate', value: 33369 },
    { label: 'Download Rate', value: 12513 },
];

const EmailActivity = () => (
    <Paper sx={{ height: '500px', background: "white" }}>
        <Box sx={{ p: 2, backgroundColor: '#b388eb' }}>
            <Typography variant="h6" color="white">Email Activity</Typography>
        </Box>
        <Box sx={{ padding: 2, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {emailStats.map(email => (
                <Box key={email.label} sx={{ width: "200px", height: "180px", border: "2px solid black", paddingX: 3, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='subtitle1'>{email.label}</Typography>
                        <Email />
                    </Box>
                    <Typography variant='h5' fontWeight="bold">{email.value}</Typography>
                </Box>
            ))}
        </Box>
    </Paper>
);

export default EmailActivity;