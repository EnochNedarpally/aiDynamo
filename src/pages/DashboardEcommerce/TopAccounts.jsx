import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { truncateWords } from '../../helpers/helper_utils';
import axios from 'axios';
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

const TopAccounts = () => {
    const [topAccount, setTopAccount] = useState([]);
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    useEffect(() => {
        fetchTopAccount()
    }, [])

    const fetchTopAccount = async () => {
        try {
            const data = await axios.get(`${api.API_URL}/dashboard/top-account`, config)
            if (data) {
                setTopAccount(data?.slice(0, 5) ?? [])
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
                        {topAccount.map((row, idx) => (
                            <TableRow key={idx} sx={{ border: "none", backgroundColor: "lightgray" }}>
                                <TableCell sx={{ position: "relative", padding: "10px 0", borderBottom: '10px solid transparent', zIndex: 2 }}>
                                    <Box sx={{ width: "60px", padding: '10px 4px', height: "35px", backgroundColor: "#7ed957", position: "absolute", left: "-30px", bottom: "-17px", zIndex: 1, clipPath: 'polygon(0% 20%, 67% 20%, 67% 46%, 100% 46%, 61% 80%, 60% 80%, 0% 80%)' }}>
                                        <Typography color='white' variant='caption'>{row.percentage}</Typography>
                                    </Box>
                                    <Typography sx={{ paddingLeft: 1 }} variant='title'>{truncateWords(row.name, 5)}</Typography></TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{row.emailSent.toLocaleString()}</TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{row.campaign}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}


export default TopAccounts;
