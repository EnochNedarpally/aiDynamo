import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { truncateWords } from '../../helpers/helper_utils';
import axios from 'axios';
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

const data = [
    { name: 'I1001', emailSent: 158005, campaign: 2395, percentage: "17%" },
    { name: 'I1008', emailSent: 143730, campaign: 2142, percentage: "8%" },
    { name: '269C8', emailSent: 128000, campaign: 1718, percentage: "13%" },
    { name: 'I1015', emailSent: 98910, campaign: 1612, percentage: "22%" },
    { name: 'INF02', emailSent: 76380, campaign: 1410, percentage: "11%" },
];

const TopAccounts = () => {
    const [topAccount, setTopAccount] = useState([]);
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    useEffect(() => {
        // fetchTopAccount()
    }, [])

    const fetchTopAccount = async () => {
        try {
            const data = await axios.get(`${api.API_URL}/dashboard/top-asset`, config)
            if (data.status) {
                setTopAccount(data.responseData.slice(0, 4))
            }
            else toast.error("Unable to fetch Accounts")
        } catch (error) {
            toast.error("Unable to fetch Accounts")
            console.log("error", error)
        }
    }

    return (
        <Paper sx={{ height: "400px" }}>
            <ToastContainer />
            <Box sx={{ p: 1, backgroundColor: '#b388eb' }}>
                <Typography variant="h6" color="white">Top Account</Typography>
            </Box>
            <Box sx={{ paddingLeft: '30px', paddingRight: "10px" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: "10px" }}>Name</TableCell>
                            <TableCell sx={{ padding: "10px" }}>Email Sent</TableCell>
                            <TableCell sx={{ padding: "10px" }}>Campaign</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow key={idx} sx={{ border: "none", backgroundColor: "lightgray" }}>
                                <TableCell sx={{ position: "relative", padding: "10px 0", borderBottom: '10px solid transparent', zIndex: 2 }}>
                                    <Box sx={{ width: "40px", padding: '10px 4px', height: "35px", backgroundColor: "#7ed957", position: "absolute", left: "-26px", bottom: "-17px", zIndex: 1, clipPath: 'polygon(0% 20%, 67% 20%, 67% 46%, 100% 46%, 61% 80%, 60% 80%, 0% 80%)' }}>
                                        <Typography color='white' variant='caption'>{row.percentage}</Typography>
                                    </Box>
                                    <Typography sx={{ paddingLeft: 1 }} variant='title'>{truncateWords(row.name, 5)}</Typography></TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{row.emailSent.toLocaleString()}</TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{row.subscribers}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}


export default TopAccounts;
