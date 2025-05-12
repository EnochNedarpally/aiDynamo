import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { iconStyle } from '../../helpers/helper_utils';

const UsersByDeviceChart = () => {
    const users = [
        { name: "Desktop Users", count: "78.56k", diff: "2.08%", color: "#454375", growth: true },
        { name: "Mobile Users", count: "105.02k", diff: "10.52%", color: "#f8b94c", growth: false },
        { name: "TabletUsers", count: "42.89k", diff: "7.36%", color: "#e47239", growth: false },
    ];

    const chartData = {
        series: [78560, 105020, 42890],
        options: {
            chart: { type: 'donut' },
            labels: ['Desktop', 'Mobile', 'Tablet'],
            colors: ['#3f51b5', '#ff9800', '#e91e63'],
            legend: { position: 'bottom' }
        }
    };

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
            <div style={iconStyle.dashboardHeader}>Users by Device</div>
            <Table>
                <TableHead>
                    <TableRow>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, i) => (
                        <TableRow key={user}>
                            <TableCell sx={{ display: "flex", gap: 2, alignItems: "center" }}><div style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: user.color,
                                transform: "rotate(45deg)",
                            }}></div> {user.name}</TableCell>
                            <TableCell>{user.count}</TableCell>
                            <TableCell sx={{ color: user.growth ? "#1be0a9" : "#e47239" }}>{user.diff}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default UsersByDeviceChart;
