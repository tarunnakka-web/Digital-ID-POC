// Import necessary dependencies from React and MUI
import React, { useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import {
  Tabs, Tab, Box, Typography, TextField,
  Button, Paper, Alert, Container
} from '@mui/material';
import userManager from '../../auth/forgerockConfig';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006a4d', // Custom primary color
    },
    secondary: {
      main: '#006a4d', // Custom secondary color (optional)
    },
  },
  components: {
    // Override the styles for TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            '&:hover': {
              borderColor: '#006a4d', // Hover border color for TextField
            },
          },
        },
      },
    },
    // Override the styles for Select (for dropdowns)
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:hover': {
            borderColor: '#006a4d', // Hover border color for Select
          },
        },
      },
    },
    // Override the styles for Button (optional)
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#004d3f', // Darker shade for Button hover
          },
        },
      },
    },
  },
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

  const navigate = useNavigate();

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
      height:"70vh",
    }}
  >
     <Box
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
          DIGITAL{'\n'}VERIFICATION
          </Typography>
        </Box>
<ThemeProvider theme={theme} > 
    <Paper elevation={4} sx={{ padding: 4, width:400}}>
      {/* Title */}
      <Typography fontWeight="bold" variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Secure Login
      </Typography>

      {/* Description */}
      <Typography variant="body2" align="center" sx={{ marginBottom: 3, color: 'text.secondary' }}>
        If you are already logged in, select a method to continue.
      </Typography>

      {/* Tabs for login methods */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Email" sx={{ fontWeight: 'bold' }} />
        <Tab label="OTP" sx={{ fontWeight: 'bold' }} />
        <Tab label="Fingerprint" sx={{ fontWeight: 'bold' }} />
      </Tabs>

      <Box mt={3}>
        {/* Email Login Form */}
        {tabIndex === 0 && (
          <Box>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Enter your email and password to log in.
            </Typography>
            <TextField label="Username" fullWidth margin="normal" variant="outlined" />
            <TextField label="Password" type="password" fullWidth margin="normal" variant="outlined" />
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, backgroundColor: '#006a4d', '&:hover': { backgroundColor: '#1a8066' } }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        )}

        {/* OTP Login Form */}
        {tabIndex === 1 && (
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
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
              <Alert severity={verified ? "success" : "info"} sx={{ mt: 1 }}>
                {successMsg}
              </Alert>
            )}
          </Box>
        )}

        {/* Fingerprint Login */}
        {tabIndex === 2 && (
          <Box>
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

        {/* Register Link */}
        <Typography variant="body2" align="center" sx={{ marginTop: 2, color: 'text.secondary' }}>
          Kindly Register if you are a new user.
        </Typography>
        <Button
          variant="text"
          fullWidth
          sx={{ marginTop: 1, color: '#006a4d', fontWeight: 'bold', '&:hover': { color: '#ffffff' } }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
    </Paper>
    </ThemeProvider>
    </Box>
    </Container>
  );
}

export default LoginPage;
