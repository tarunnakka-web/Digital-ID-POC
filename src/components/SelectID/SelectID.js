import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,Button,Typography, Paper,Select, MenuItem,} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Verification = () => {
  const [dropdownValue, setDropDownValue] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validate if provider is selected
    if (!dropdownValue) {
      setError('Please select an ID provider.');
      return;
    }
  
    // If valid, navigate to login page
    navigate("/login", { state: { selectedProvider: dropdownValue } });
  };
  

  const handleDropdownChange = (e) => {
    setDropDownValue(e.target.value);
    setError("");
  }

  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center"   minHeight="70vh" padding={5} >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:5}}>
          <CheckCircleIcon sx={{ fontSize: 35, }} />
          <Typography variant='h4' fontWeight={"bold"}>Select ID</Typography>
        </Box>
        <Box mt={3} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Select ID Provider:
          </Typography>
        <Select value={dropdownValue} onChange={handleDropdownChange} fullWidth displayEmpty sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", }}>
          <MenuItem value="" disabled> Choose an ID provider </MenuItem>
          <MenuItem value="LloydsID">Lloyds ID Provider</MenuItem>
          <MenuItem value="ProviderA">Provider A</MenuItem>
          <MenuItem value="ProviderB">Provider B</MenuItem>
        </Select>
        {error && ( <Typography color="error" sx={{ mt: 2 }}>  {error}  </Typography> )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>  Select </Button>
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default Verification;
