// Import necessary dependencies from React and MUI
import React, { useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useNavigate, useLocation } from 'react-router-dom';
import {
  Tabs, Tab, Box, Typography, TextField,
  Button, Paper, Alert, Container, Divider
} from '@mui/material';
import userManager from '../../auth/forgerockConfig';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: { main: '#006a4d' },
    secondary: { main: '#006a4d' }
  },
  components: {
    MuiTextField: {
      defaultProps: { size: 'small', margin: 'dense' }
    },
    MuiButton: {
      defaultProps: { size: 'small' }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          minHeight: '32px',
          padding: '6px 12px'
        }
      }
    }
  }
});

// Utility function to simulate OTP generation (6-digit number)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const maskedPhoneNumber = (phoneNumber) => {
    const visibleDigits = 4;
    if (phoneNumber.length <= visibleDigits) return phoneNumber;
    const maskedPart = "*".repeat(phoneNumber.length - visibleDigits);
    const visiblePart = phoneNumber.slice(-visibleDigits);
    return maskedPart + visiblePart;
}

// LoginPage component
function LoginPage() {
  // State variables
  const [tabIndex, setTabIndex] = useState(0);              // Current selected tab
  const [identifier, setIdentifier] = useState('');          // Phone or email input
  const [otp, setOtp] = useState('');                        // User-entered OTP
  const [generatedOtp, setGeneratedOtp] = useState('');      // Simulated OTP
  const [otpSent, setOtpSent] = useState(false);             // Whether OTP has been sent
  const [verified, setVerified] = useState(false);           // Whether OTP was verified
  const [error, setError] = useState('');                    // Error message
  const [successMsg, setSuccessMsg] = useState('');
  const [isFocused, setIsFocused] = useState(false);          // Success message
 // const location = useLocation();
  const navigate = useNavigate();
  // const selectedProvider = location.state?.selectedProvider;

  // Helper validation functions
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^\d{10}$/.test(value);

  const handleLogin = () => {
    userManager.signinRedirect();
  };

  // Handle OTP sending
  const handleSendOtp = () => {
    if (!isEmail(identifier) && !isPhone(identifier)) {
      setError("Please enter a valid email or 10-digit phone number.");
      return;
    }

    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setError('');
    setSuccessMsg(`OTP sent to ${maskedPhoneNumber(identifier)}. (Simulated OTP: ${otpCode})`);
    console.log("Simulated OTP:", otpCode); // Debug log
  };

  // Handle OTP login verification
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

  // Handle tab change (Email / OTP / Fingerprint)
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const displayNumber = isFocused ? identifier : maskedPhoneNumber(identifier);
 // margin: 'auto', marginTop: 8,

  return (
    <Container sx={{ height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Box
    sx={{
      display: 'flex',
      boxShadow: 3,
      borderRadius: 3,
      overflow: 'hidden',
      height:"80vh",
    }}
  >
     {/* <Box
      sx={{
        backgroundColor: '#006a4d',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:"center",
        width:300,
        padding:4
      }}
    >
          <Typography
              variant="h2"
              color="#ffffff"
              fontWeight="bold"
              sx={{ whiteSpace: 'pre-line' }}
          >
          WELCOME TO {'\n'} {selectedProvider}
          </Typography>
        </Box> */}
<ThemeProvider theme={theme} > 
    <Paper elevation={4} sx={{ padding: 5, width:400}}>
      {/* Title */}
      <Typography fontWeight={"bold"} variant="h6" align="center" sx={{ mb: 2}}>
        Secure Login
      </Typography>

       {/* Register Link */}
        <Typography variant="body2" align="center" sx={{ mt: 1, mb:1, color: 'text.secondary', fontWeight:"bold" }}>
          Get started with your reusable ID
        </Typography>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1, mb:1, color:"#ffffff", backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
          // sx={{ mt: 1, mb:1, color: '#ffffff', backgroundColor:"#006a4d"}}
          onClick={() => navigate('/register')}
        >
          Create a new digital ID
        </Button>

      <Divider>or</Divider>

      {/* Tabs for login methods */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{mb:1, mt:1}}>
        <Tab label="Email" sx={{ fontWeight: 700 }} />
        <Tab label="OTP" sx={{ fontWeight: 700 }} />
        <Tab label="Fingerprint" sx={{ fontWeight: 700 }} />
      </Tabs>

      <Box mt={2}>
        {/* Email Login Form */}
        {tabIndex === 0 && (
          <Box sx={{border: '1px solid #ddd', borderRadius: 2, p: 3 }}>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 1 }}>
              Enter your email and password to log in.
            </Typography>
            <TextField label="Username" fullWidth margin="normal" variant="outlined" />
            <TextField label="Password" type="password" fullWidth margin="normal" variant="outlined" />
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 1, backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        )}

        {/* OTP Login Form */}
        {tabIndex === 1 && (
          <Box sx={{ maxWidth: 400, maxHeight: 500, overflowY: 'auto', mx: 'auto', mt: 1, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 1 }}>
              Enter your phone/email and OTP to log in.
            </Typography>

            {/* Phone or Email input */}
            <TextField
              label="Phone or Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={displayNumber}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={otpSent}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* OTP input (if OTP has been sent) */}
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

            {/* OTP action button */}
            {!otpSent ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 1, backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 1, backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
                onClick={handleLoginWithOtp}
              >
                Login with OTP
              </Button>
            )}

            {/* Feedback messages */}
            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
            {successMsg && (
              <Alert  severity={verified ? "success" : "info"} sx={{ mt: 1}}>
                {successMsg}
              </Alert>
            )}
          </Box>
        )}

        {/* Fingerprint Login */}
        {tabIndex === 2 && (
          <Box sx={{border: '1px solid #ddd', borderRadius: 2, p: 3 }}>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 1 }}>
              Use your fingerprint to log in.
            </Typography>
            <Button
              onClick={() => navigate("/scan-finger-print-forLogin")}
              variant="contained"
              fullWidth
              sx={{ marginTop: 1, padding: '10px 0', backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
            >
              Scan Fingerprint
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
    </ThemeProvider>
    </Box>
    </Container>
  );
}

export default LoginPage;
