import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

/**
 * FingerprintScanner simulates a fingerprint scanning interface.
 * Replace timeout logic with actual fingerprint scanner integration as needed.
 */
const AddFingerprintForRegistration = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isScanningComplete, setIsScanningComplete] = useState(false);

  const navigate = useNavigate();

  // Starts the simulated fingerprint scan process
  const startFingerprintScan = () => {
    setIsScanning(true);
    setScanStatus('Scanning...');
    setScanSuccess(false);
    setIsScanningComplete(false);

    // Simulated scan with random outcome (replace with real scanner logic)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        setScanSuccess(true);
        setScanStatus('Fingerprint scan successful!');
      } else {
        setScanSuccess(false);
        setScanStatus('Fingerprint scan failed. Try again.');
      }

      setIsScanning(false);
      setIsScanningComplete(true);
    }, 3000);
  };

  // Resets the scan state for retry
  const resetScan = () => {
    setScanStatus('');
    setScanSuccess(false);
    setIsScanningComplete(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 12,
        maxWidth: 500,
        mx: 'auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Fingerprint Scanner
      </Typography>

      <Box sx={{ mb: 3 }}>
        {/* Scan initiation or retry buttons */}
        {!isScanningComplete && !scanSuccess && (
          <Button
            variant="contained"
            onClick={startFingerprintScan}
            fullWidth
            disabled={isScanning}
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#388E3C' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px 24px'
            }}
          >
            {isScanning ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <FingerprintIcon sx={{ mr: 1 }} />
            )}
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        )}

        {isScanningComplete && !scanSuccess && (
          <Button
            variant="outlined"
            onClick={resetScan}
            fullWidth
            sx={{
              borderColor: '#F44336',
              color: '#F44336',
              '&:hover': {
                borderColor: '#D32F2F',
                color: '#D32F2F'
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px 24px'
            }}
          >
            <ErrorIcon sx={{ mr: 1 }} />
            Retry Scan
          </Button>
        )}

        {/* Success message */}
        {scanSuccess && (
          <Typography
            variant="body1"
            color="success.main"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} />
            Fingerprint scan successful!
          </Typography>
        )}
      </Box>

      {/* Scan status text and continue button */}
      {scanStatus && (
        <>
          <Typography
            variant="body2"
            color={scanSuccess ? 'success.main' : 'error.main'}
          >
            {scanStatus}
          </Typography>
          {scanSuccess && (
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              fullWidth
              sx={{ mt: 2, padding: '12px 24px', backgroundColor:"#006a4d" }}
            >
              Continue
            </Button>
          )}
        </>
      )}

      {/* Helper message */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Ensure your finger is placed properly on the scanner.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddFingerprintForRegistration;
