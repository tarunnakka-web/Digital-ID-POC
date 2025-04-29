import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Button, Box } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

function FingerprintPage() {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Simulate fingerprint scanning delay
    const timer = setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 3000); // Simulate 3 seconds scan

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Paper  elevation={4} sx={{ width: 400, padding: 4, margin: 'auto', marginTop: 16, borderRadius: 2 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Fingerprint Authentication
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={3}>
        <FingerprintIcon color="primary" sx={{ fontSize: 60 }} />
        {verifying && (
          <>
            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              Scanning your fingerprint...
            </Typography>
            <CircularProgress sx={{ marginTop: 2 }} />
          </>
        )}

        {!verifying && verified && (
          <>
            <Typography variant="body2" align="center" sx={{ marginTop: 2, color: 'green', fontWeight: 'bold' }}>
              Fingerprint Verified Successfully!
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 3, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default FingerprintPage;
