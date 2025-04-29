import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString(); // Simulate 6-digit OTP


function LoginPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^\d{10}$/.test(value);

  const handleSendOtp = () => {
    if (!isEmail(identifier) && !isPhone(identifier)) {
      setError("Please enter a valid email or 10-digit phone number.");
      return;
    }
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setError('');
    setSuccessMsg(`OTP sent to ${identifier}. (Simulated OTP: ${otpCode})`);
    console.log("Simulated OTP:", otpCode);
  };

  const handleLoginWithOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      setSuccessMsg("Login successful! OTP verified.");
      setError('');
    } else {
      setError("Incorrect OTP. Please try again.");
      setVerified(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Paper elevation={4} sx={{ width: 400, padding: 4, margin: 'auto', marginTop: 8, borderRadius: 2 }}>
      <Typography fontWeight={"bold"} variant="h6" align="center" sx={{ marginBottom: 2 }}>
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
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
            Enter your phone/email and OTP to log in.
          </Typography>
    
          <TextField
            label="Phone or Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={otpSent}
          />
    
          {otpSent && (
            <TextField
              label="OTP"
              fullWidth
              margin="normal"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
    
          {!otpSent ? (
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 1, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 1, backgroundColor: 'info' }}
              onClick={handleLoginWithOtp}
            >
              Login with OTP
            </Button>
          )}
    
          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          {successMsg && <Alert severity={verified ? "success" : "info"} sx={{ mt: 1 }}>{successMsg}</Alert>}
        </Box>
        )}

        {tabIndex === 2 && (
          <Box>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 1 }}>
              Use your fingerprint to log in.
            </Typography>
            <Button onClick={() => navigate('/finger-print')} variant="contained" fullWidth sx={{ marginTop: 1, padding: '10px 0', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
              Scan Fingerprint
            </Button>
          </Box>
        )}

        <Typography variant="body2" align="center" sx={{ marginTop: 2, color: 'text.secondary' }}>
          Kindly Register if you are a new user.
        </Typography>

        <Button
          variant="text"
          fullWidth
          sx={{ marginTop: 1, color: '#1976d2', fontWeight: 'bold' }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginPage;
