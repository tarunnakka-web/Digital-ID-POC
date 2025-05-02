import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectID = () => {
  // State for holding the selected dropdown value and error message
  const [dropdownValue, setDropDownValue] = useState("");
  const [error, setError] = useState('');
  
  // useNavigate hook for navigating programmatically
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validate if a provider is selected
    if (!dropdownValue) {
      setError('Please select an ID provider.');
      return; // Stop further execution if validation fails
    }

    // If valid, navigate to the login page and pass the selected provider state
    navigate("/login", { state: { selectedProvider: dropdownValue } });
  };

  // Handler for dropdown value change
  const handleDropdownChange = (e) => {
    setDropDownValue(e.target.value); // Update selected provider
    setError(""); // Clear error when dropdown changes
  };

  return (
    <>
      {/* Main container to center the form */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" padding={5}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          {/* Header section with a check icon and title */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
            <CheckCircleIcon sx={{ fontSize: 35 }} />
            <Typography variant='h4' fontWeight={"bold"}>Select ID</Typography>
          </Box>

          {/* Form section for selecting ID provider */}
          <Box mt={3} component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Select ID Provider:
            </Typography>

            {/* Dropdown for selecting the ID provider */}
            <Select
              value={dropdownValue}
              onChange={handleDropdownChange}
              fullWidth
              displayEmpty
              sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px" }}
            >
              <MenuItem value="" disabled>Choose an ID provider</MenuItem>
              <MenuItem value="LloydsID">Lloyds ID Provider</MenuItem>
              <MenuItem value="ProviderA">Provider A</MenuItem>
              <MenuItem value="ProviderB">Provider B</MenuItem>
            </Select>

            {/* Display error message if validation fails */}
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {/* Submit button to select the provider */}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Select
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default SelectID;
