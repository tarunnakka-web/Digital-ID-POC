import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  Collapse,
  FormControl,
  InputLabel
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectID = () => {
  const [dropdownValue, setDropDownValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!dropdownValue) {
      setError('Please select an ID provider.');
      return;
    }

    navigate('/login', { state: { selectedProvider: dropdownValue } });
  };

  const handleDropdownChange = (e) => {
    setDropDownValue(e.target.value);
    if (error) setError('');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
      sx={{ backgroundColor: '#f0f2f5' }}
    >
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
        {/* Header section with a check icon and title */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 35 }} />
            <Typography variant='h4' sx={{ fontSize: 30 }} fontWeight={"bold"}>Select ID</Typography>
          </Box>

        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth sx={{ mb: 2 }} error={Boolean(error)}>
            
            <InputLabel id="provider-label">ID Provider</InputLabel>
            <Select
              labelId="provider-label"
              id="provider-select"
              value={dropdownValue}
              label="ID Provider"
              onChange={handleDropdownChange}
              aria-describedby="provider-helper-text"
              sx={{backgroundColor: "#f5f5f5" , borderRadius:"6px" }}
            >
              <MenuItem sx={{fontSize:"14px"}} value="LloydsID">Lloyds ID Provider</MenuItem>
              <MenuItem sx={{fontSize:"14px"}} value="ProviderA">Provider A</MenuItem>
              <MenuItem sx={{fontSize:"14px"}} value="ProviderB">Provider B</MenuItem>
            </Select>
          </FormControl>

          <Collapse in={Boolean(error)}>
            <Typography
              id="provider-helper-text"
              color="error"
              variant="body2"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          </Collapse>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!dropdownValue}
            sx={{ mt: 1, textTransform: 'none', fontWeight: 'bold' , backgroundColor:"#006A4D" }}
          >
            Select
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SelectID;
