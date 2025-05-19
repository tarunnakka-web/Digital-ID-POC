import React, { useState, useRef } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  Stack,
  Card,
} from "@mui/material";

import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const videoConstraints = {
  facingMode: 'environment',
};

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  // const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(true); // Show scanner by default
  const [success, setSuccess] = useState(false); // To show success message

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      processImage(imageSrc); // optional: remove if you only want OCR after Upload
    }
  };

  const processImage = async (imageData) => {
    setLoading(true);
    // setExtractedText('');

    try {
      const res = await fetch(imageData);
      const blob = await res.blob();

      const { data: { text } } = await Tesseract.recognize(blob, 'eng', {
        logger: m => console.log(m),
      });

      // setExtractedText(text);
    } catch (err) {
      console.error('OCR Error:', err);
      // setExtractedText('Error extracting text.');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    // setExtractedText('');
  };

  const uploadImage = (image) => {
    if (image) {
      // Simulate upload success
      setCapturedImage(null);
      setUpload(false);
      setSuccess(true);
    }
  };

  return (
    <>
      {upload ? (
        <Box p={4} maxWidth="1000px" mx="auto">
          <Typography variant="h4" textAlign="center" gutterBottom>
            📄 Scan your Document here
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  {capturedImage ? 'Captured Image' : 'Live Camera'}
                </Typography>

                {!capturedImage ? (
                  <>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={captureImage}
                    >
                      Capture & Scan
                    </Button>
                  </>
                ) : (
                  <>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{
                        maxWidth: '100%',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                      }}
                    />
                    <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                      <Button variant="outlined" onClick={resetScanner}>
                        Retake
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => processImage(capturedImage)}
                        disabled={loading}
                      >
                        Rescan
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => uploadImage(capturedImage)}
                        disabled={loading}
                      >
                        Upload
                      </Button>
                    </Stack>
                  </>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : success ? (
        <Box p={4} maxWidth="600px" mx="auto" textAlign="center">
          <Typography variant="h5" gutterBottom color="success.main">
            ✅ Document uploaded successfully!
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setUpload(true);
              setSuccess(false);
            }}
          >
            Scan Another Document
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default DocumentScanner;
