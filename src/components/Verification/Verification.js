import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Select, 
  MenuItem,
} from '@mui/material';
import { useUser } from '../../context/UserContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LoginPage = () => {
  const { setUser, setIsAuthorized, loadUserData } = useUser();
  const [dropdownValue, setDropDownValue] = useState("");
  const [ID, setID] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;  // might contain item info

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ID, dropdownValue }),
      });
      if (!response.ok) {
        throw new Error('Invalid ID');
      }
      const userData = await response.json();
      // Save user in context
      setUser(userData);
      setIsAuthorized(true);
      // Optionally load additional user data
      await loadUserData();
      // Redirect: if navigating from ProductCards, go to cart
      if (state?.item) {
        navigate('/cart', { state: { item: state.item } });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDropdownChange = (e) => {
    setDropDownValue(e.target.value)
  }

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
      padding={5}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:5}}>
        <CheckCircleIcon sx={{ fontSize: 35, }} />
        <Typography variant='h4' fontWeight={"bold"}>Verification</Typography>
        </Box>
      <Box mt={3} component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Select ID Verification Provider:
        </Typography>
        <Select
          value={dropdownValue}
          onChange={handleDropdownChange}
          fullWidth
          displayEmpty
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
          }}
        >
          <MenuItem value="" disabled>
            Choose an ID provider
          </MenuItem>
          <MenuItem value="LloydsID">Lloyds ID Provider</MenuItem>
          <MenuItem value="ProviderA">Provider A</MenuItem>
          <MenuItem value="ProviderB">Provider B</MenuItem>
        </Select>
      
        <TextField
            label="ID"
            type="text"
            required
            fullWidth
            margin="normal"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />

      </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/register')}
          >
            New user? Register here
          </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
