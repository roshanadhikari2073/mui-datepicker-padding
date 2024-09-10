import React, { useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function CustomDateInput() {
  const [dateTime, setDateTime] = useState(dayjs()); // Current date and time as initial value
  const [textAreaValue, setTextAreaValue] = useState(dayjs().format('M/D/YYYY h:mm A'));

  const currentTime = dayjs();

  // Handle DateTimePicker change and sync with the TextArea
  const handleDateChange = (newDate) => {
    if (newDate && newDate.isValid()) {
      if (newDate.isBefore(currentTime)) {
        // If the new date is in the past, reset to current time
        setDateTime(currentTime);
        setTextAreaValue(currentTime.format('M/D/YYYY h:mm A'));
      } else {
        // Otherwise, set the new date
        setDateTime(newDate);
        setTextAreaValue(newDate.format('M/D/YYYY h:mm A'));
      }
    }
  };

  // Handle manual input change in the TextArea
  const handleTextAreaChange = (e) => {
    const rawValue = e.target.value;
    setTextAreaValue(rawValue);

    const parsedDate = dayjs(rawValue, 'M/D/YYYY h:mm A', true);
    if (parsedDate.isValid()) {
      if (parsedDate.isBefore(currentTime)) {
        // If manually entered date is in the past, reset to current time
        setDateTime(currentTime);
        setTextAreaValue(currentTime.format('M/D/YYYY h:mm A'));
      } else {
        setDateTime(parsedDate); // Sync DateTimePicker with valid input
      }
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        gap: '30px',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', marginBottom: '20px' }}>
        Custom Themed Date & Time Picker
      </Typography>

      {/* DateTimePicker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select Date & Time"
          value={dateTime}
          onChange={handleDateChange}
          inputFormat="M/D/YYYY h:mm A" // Use non-padded format
          slotProps={{
            textField: {
              sx: {
                minWidth: '300px',
                backgroundColor: '#A7F1A8', // Light green background
                borderRadius: '15px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                fontSize: '20px',
                fontWeight: 'bold',
              },
            },
          }}
        />
      </LocalizationProvider>

      {/* Text Area for manual input */}
      <TextField
        label="Manual Date & Time"
        multiline
        rows={3}
        value={textAreaValue}
        onChange={handleTextAreaChange}
        variant="outlined"
        placeholder="M/D/YYYY h:mm A"
        sx={{
          minWidth: '300px',
          height: '120px', // Adjusted height for the textarea
          backgroundColor: '#F5E472', // Light yellow background
          borderRadius: '15px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          fontSize: '20px',
          fontWeight: 'bold',
          marginTop: '10px',
        }}
      />
    </Box>
  );
}
