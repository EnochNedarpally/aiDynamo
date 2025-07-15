import React, { useState } from 'react';
import {
  Box,
  Divider,
  MenuItem,
  Select,
  Typography,
  Popover,
  TextField,
  Button,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PeriodSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Current Quarter');
  const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());

  const fromatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : ''
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleApplyButton = () => {
    handleClose();
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            mx: 2,
            px: 2,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'white',
            boxShadow: 1,
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <Typography variant="body2">Period</Typography>
          <CalendarMonthIcon fontSize="small" />
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{ fontSize: '14px', minWidth: 150 }}
          >
            <MenuItem value="Current Quarter">Current Quarter</MenuItem>
            <MenuItem value="Last Quarter">Last Quarter</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
        </Box>
        <Divider sx={{ flexGrow: 1 }} />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box p={2} display="flex" gap={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
            <Button color='primary' onClick={handleApplyButton}>Apply</Button>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default PeriodSelector;
