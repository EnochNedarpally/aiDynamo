import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { iconStyle } from '../../helpers/helper_utils';

const AssetTable = () => {
    const assets = [
        { name: "CFOs Seize Opportunity...", code: 1, emailSent: 16784, subscribers: 2503 },
        { name: "Top 7 Global Employment...", code: 2, emailSent: 14529, subscribers: 1487 },
        { name: "Innovate with secured cloud", code: 3, emailSent: 4201, subscribers: 651 },
        { name: "The Customer 360 Playbook", code: 4, emailSent: 3578, subscribers: 385 },
        { name: "CFOs Seize Opportunity...", code: 1, emailSent: 16784, subscribers: 2503 },
        { name: "Top 7 Global Employment...", code: 2, emailSent: 14529, subscribers: 1487 },
        { name: "Innovate with secured cloud", code: 3, emailSent: 4201, subscribers: 651 },
        { name: "The Customer 360 Playbook", code: 4, emailSent: 3578, subscribers: 385 },
    ];


    return (
        <Paper
        sx={{
            flex: 1,
            borderRadius:"20px 20px 4px 4px",
            boxShadow: `
            6px 6px 10px rgb(80, 78, 78),
            0px 2px 5px #353535,
            inset 0 0px 2px rgba(255,255,255,0.05),
            inset 0 -1px 2px rgba(0,0,0,0.3)
            `,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transformStyle: "preserve-3d",
            transform: "rotateX(0) rotateY(-6deg)",
          }}
        >
            <div style={iconStyle.dashboardHeader}>Top Assets</div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Email Sent</TableCell>
                        <TableCell>Subscribers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assets.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.code}</TableCell>
                            <TableCell>{row.emailSent}</TableCell>
                            <TableCell>{row.subscribers}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default AssetTable;
