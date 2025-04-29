import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Button, Box } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';


function FingerprintPage() {
  const navigate = useNavigate();
  
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const handleFingerprintScan = async () => {
    setError('');
    setScanning(true);

    try {
      const publicKey = {
        challenge: Uint8Array.from('randomChallengeHere', c => c.charCodeAt(0)),
        timeout: 60000,
        userVerification: 'preferred',
        allowCredentials: [] // Leave empty to let browser pick
      };

      const assertion = await navigator.credentials.get({ publicKey });

      if (assertion) {
        setVerified(true);
      } else {
        throw new Error('Fingerprint authentication failed.');
      }
    } catch (err) {
      setError('Fingerprint scan failed or was cancelled.');
    } finally {
      setScanning(false);
    }
  };

  const handleContinue = () => {
    
    navigate('/');
  };

  return (
    <Paper elevation={4} sx={{ width: 400, padding: 4, margin: 'auto', marginTop: 16, borderRadius: 2 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Fingerprint Authentication
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={3}>
        <Box
          onClick={handleFingerprintScan}
          sx={{
            cursor: scanning || verified ? 'not-allowed' : 'pointer',
            opacity: scanning || verified ? 0.5 : 1,
          }}
        >
          <FingerprintIcon color="primary" sx={{ fontSize: 80 }} />
        </Box>

        {error && (
          <Typography variant="body2" align="center" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {scanning && (
          <>
            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              Waiting for fingerprint scan...
            </Typography>
            <CircularProgress sx={{ marginTop: 2 }} />
          </>
        )}

        {!scanning && !verified && !error && (
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Tap the fingerprint icon to scan
          </Typography>
        )}

        {verified && (
          <>
            <Typography variant="body2" align="center" sx={{ marginTop: 2, color: 'green', fontWeight: 'bold' }}>
              Fingerprint Verified!
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
