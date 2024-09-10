import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function App() {
  const [inputValue, setInputValue] = useState(null); // The DatePicker expects a Date or null

  const handleDateChange = (newValue) => {
    // newValue will be a Day.js object, ensure it's valid
    if (newValue && newValue.isValid()) {
      setInputValue(newValue); // Set the valid Day.js object in state
    } else {
      setInputValue(null); // If invalid, reset the value
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '20px' }}>
        <h1>DatePicker Example</h1>
        <DatePicker
          label="Select a Date"
          value={inputValue} // The value must be a Day.js object or null
          onChange={handleDateChange} // Handles when a date is selected
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
