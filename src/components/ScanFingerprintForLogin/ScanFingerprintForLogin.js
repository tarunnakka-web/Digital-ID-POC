import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
  Container
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

/**
 * FingerprintPage handles fingerprint-based user authentication using the WebAuthn API.
 */
function ScanFingerprintForLogin() {
  const navigate = useNavigate();

  // State to manage fingerprint scan status
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  /**
   * Initiates fingerprint scanning via WebAuthn API.
   */
  const handleFingerprintScan = async () => {
    setError('');
    setScanning(true);

    try {
      const publicKey = {
        challenge: Uint8Array.from('randomChallengeHere', c => c.charCodeAt(0)),
        timeout: 60000,
        userVerification: 'preferred',
        allowCredentials: [] // Let the browser decide which credentials to use
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

  /**
   * Redirects the user after successful verification.
   */
  const handleContinue = () => {
    navigate('/');
  };

  return (
    <Container
      sx={{
        height: '100vh',
        width: '100vw',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ marginBottom: 2 }}
        >
          Fingerprint Authentication
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={3}
        >
          {/* Fingerprint icon - initiates scan */}
          <Box
            onClick={handleFingerprintScan}
            sx={{
              cursor: scanning || verified ? 'not-allowed' : 'pointer',
              opacity: scanning || verified ? 0.5 : 1,
            }}
          >
            <FingerprintIcon sx={{ fontSize: 80, color:"#006a4d" }} />
          </Box>

          {/* Error message display */}
          {error && (
            <Typography
              variant="body2"
              align="center"
              color="error"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}

          {/* Loading spinner and message during scan */}
          {scanning && (
            <>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Waiting for fingerprint scan...
              </Typography>
              <CircularProgress sx={{ marginTop: 2 }} />
            </>
          )}

          {/* Prompt message when idle */}
          {!scanning && !verified && !error && (
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: 2 }}
            >
              Tap the fingerprint icon to scan
            </Typography>
          )}

          {/* Verified state message and continue button */}
          {verified && (
            <>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  marginTop: 2,
                  color: 'green',
                  fontWeight: 'bold'
                }}
              >
                Fingerprint Verified!
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 3,
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default ScanFingerprintForLogin;
