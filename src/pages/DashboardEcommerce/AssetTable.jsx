import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { api } from '../../config';
import { truncateWords } from '../../helpers/helper_utils';
import { TextSnippetOutlined } from '@mui/icons-material';

const AssetTable = () => {
    const [topAsset, setTopAsset] = useState([]);
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    useEffect(() => {
        fetchTopAssets()
    }, [])

    const fetchTopAssets = async () => {
        try {
            const data = await axios.get(`${api.API_URL}/dashboard/top-asset`, config)
            if (data.status) {
                setTopAsset(data.responseData.slice(0, 4))
            }
            else toast.error("Unable to fetch Assets")
        } catch (error) {
            toast.error("Unable to fetch Assets")
            console.log("error", error)
        }
    }
    return (
        <Paper sx={{ height: "400px" }}>
            <ToastContainer />
            <Box sx={{ p: 1, backgroundColor: '#9882e7' }}>
                <Typography sx={{marginLeft:"10px",fontSize:"1rem"}} color="white"><TextSnippetOutlined sx={{marginLeft:"10px"}}/> Top Asset</Typography>
            </Box>
            <Box sx={{ paddingLeft: '40px', paddingRight: "10px" }}>
                <Table size="small" >
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ padding: "10px 0" }}>Name</TableCell>
                            <TableCell sx={{ padding: "10px 0" }}>Email Sent</TableCell>
                            <TableCell sx={{ padding: "10px 0" }}>Subscribers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topAsset.map((asset, idx) => (
                            <TableRow key={idx} sx={{ border: "none", backgroundColor: "lightgray" }}>
                                <TableCell sx={{ position: "relative", padding: "10px 0", borderBottom: '10px solid transparent', zIndex: 2 }}>
                                    <Box sx={{ width: "60px", padding: '10px 4px', height: "35px", backgroundColor: "#7ed957", position: "absolute", left: "-30px", bottom: "-17px", zIndex: 1, clipPath: 'polygon(0% 20%, 67% 20%, 67% 46%, 100% 46%, 61% 80%, 60% 80%, 0% 80%)' }}>
                                        <Typography color='white' variant='caption'>{asset?.percentage ?? "11%"}</Typography>
                                    </Box>
                                    <Typography sx={{ paddingLeft: 1 }} variant='title'>{truncateWords(asset?.name, 5)}</Typography></TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{asset.emailSent.toLocaleString()}</TableCell>
                                <TableCell sx={{ padding: "10px 0", borderBottom: '10px solid white' }}>{asset?.subscribers ?? "1122"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}


export default AssetTable;
