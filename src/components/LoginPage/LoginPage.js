import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, TextField, Button, Paper } from '@mui/material';

function LoginPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Paper elevation={4} sx={{ width: 400, padding: 4, margin: 'auto', marginTop: 8, borderRadius: 2 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Secure Login
      </Typography>

      <Typography variant="body2" align="center" sx={{ marginBottom: 3, color: 'text.secondary' }}>
        If you are already logged in, select a method to continue.
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Email" sx={{ fontWeight: 'bold' }} />
        <Tab label="OTP" sx={{ fontWeight: 'bold' }} />
        <Tab label="Fingerprint" sx={{ fontWeight: 'bold' }} />
      </Tabs>

      <Box mt={3}>
        {tabIndex === 0 && (
          <Box>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Enter your email and password to log in.
            </Typography>
            <TextField label="Username" fullWidth margin="normal" variant="outlined" />
            <TextField label="Password" type="password" fullWidth margin="normal" variant="outlined" />
            <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
              Login
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Enter your phone/email and OTP to log in.
            </Typography>
            <TextField label="Phone or Email" fullWidth margin="normal" variant="outlined" />
            <TextField label="OTP" fullWidth margin="normal" variant="outlined" />
            <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
              Login with OTP
            </Button>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Use your fingerprint to log in.
            </Typography>
            <Button variant="contained" fullWidth sx={{ marginTop: 2, padding: '10px 0', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
              Scan Fingerprint
            </Button>
          </Box>
        )}

        <Typography variant="body2" align="center" sx={{ marginTop: 3, color: 'text.secondary' }}>
          Kindly Register if you are a new user.
        </Typography>

        <Button
          variant="text"
          fullWidth
          sx={{ marginTop: 2, color: '#1976d2', fontWeight: 'bold' }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginPage;
