import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const steps = ['Personal Information', 'Document Submission', 'Set Password', 'Biometric Verification'];

export default function RegistrationStepper() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', gender: '', dob: '',
    phoneNumber: '', address: '', documentType: '', documentFile: null,
    email: '', password: '', confirmPassword: '', biometricCaptured: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, documentFile: file }));
      setErrors((prev) => ({ ...prev, documentFile: '' }));
    }
  };

  const handleBiometricCapture = () => {
    navigate("/add-finger-print-forRegistration");
    setFormData((prev) => ({ ...prev, biometricCaptured: true }));
    setSnackbarOpen(true);
  };

  const validateStep = (step) => {
    const newErrors = {};
    const { firstName, lastName, gender, dob, phoneNumber, address, documentType, documentFile, email, password, confirmPassword, biometricCaptured } = formData;

    if (step === 0) {
      if (!firstName.trim()) newErrors.firstName = 'Required';
      if (!lastName.trim()) newErrors.lastName = 'Required';
      if (!gender) newErrors.gender = 'Required';
      if (!dob) newErrors.dob = 'Required';
      if (!phoneNumber.trim()) newErrors.phoneNumber = 'Required';
      if (!address.trim()) newErrors.address = 'Required';
    }

    if (step === 1) {
      if (!documentType) newErrors.documentType = 'Required';
      if (!documentFile) newErrors.documentFile = 'Please upload a document';
    }

    if (step === 2) {
      if (!email.includes('@')) newErrors.email = 'Invalid email';
      if (password.length < 6) newErrors.password = 'At least 6 characters';
      if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 3 && !biometricCaptured) {
      newErrors.biometricCaptured = 'Complete biometric verification';
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    const nextStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((_, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    allStepsCompleted() ? setOpenDialog(true) : handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      firstName: '', lastName: '', gender: '', dob: '',
      phoneNumber: '', address: '', documentType: '', documentFile: null,
      email: '', password: '', confirmPassword: '', biometricCaptured: false,
    });
    setErrors({});
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="xlg" sx={{ mt: 5, mb: 6 }}>
      <Typography variant='h4' fontWeight={"bold"} mb={4}>Registration Form</Typography>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Stepper nonLinear activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton onClick={handleStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>

        {allStepsCompleted() ? (
          <Box textAlign="center">
            <Typography variant="h6">All steps completed - you're finished</Typography>
            <Button sx={{ mt: 2 }} onClick={handleReset} variant="outlined">Reset</Button>
          </Box>
        ) : (
          <>
            <Box component="form" noValidate autoComplete="off">
              {activeStep === 0 && (
                <>
                  <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} fullWidth margin="normal" />
                  <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} fullWidth margin="normal" />
                  <FormControl fullWidth margin="normal" error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}
                  </FormControl>
                  <TextField type="date" name="dob" label="DOB" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth margin="normal" error={!!errors.dob} helperText={errors.dob} />
                  <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                  <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" error={!!errors.address} helperText={errors.address} />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <FormControl fullWidth margin="normal" error={!!errors.documentType}>
                    <InputLabel>Document Type</InputLabel>
                    <Select name="documentType" value={formData.documentType} onChange={handleChange}>
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="passport">Passport</MenuItem>
                      <MenuItem value="aadhaar">Aadhaar</MenuItem>
                      <MenuItem value="license">Driving License</MenuItem>
                    </Select>
                    {errors.documentType && <Typography color="error" variant="caption">{errors.documentType}</Typography>}
                  </FormControl>
                  <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
                    Upload Document
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {formData.documentFile && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                              Selected File: {formData.documentFile.name}
                      </Typography>
                  )}
                  {errors.documentFile && <Typography color="error" variant="caption">{errors.documentFile}</Typography>}
                </>
              )}

              {activeStep === 2 && (
                <>
                  <TextField type="email" label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" error={!!errors.email} helperText={errors.email} />
                  <TextField
                    label="Password" name="password" value={formData.password} type={showPassword ? 'text' : 'password'}
                    onChange={handleChange} fullWidth margin="normal" error={!!errors.password} helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleChange} fullWidth margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              {activeStep === 3 && (
                <>
                  <Typography variant="subtitle1">Biometric Verification</Typography>
                  <Button onClick={handleBiometricCapture} variant="contained" fullWidth sx={{ mt: 2 }}>
                    Add Fingerprint
                  </Button>
                  {formData.biometricCaptured && <Typography sx={{ mt: 2 }} color="success.main">Fingerprint Captured</Typography>}
                  {errors.biometricCaptured && <Typography color="error">{errors.biometricCaptured}</Typography>}
                </>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              <Box>
                <Button sx={{ mr: 1 }} onClick={handleNext}>Next</Button>
                <Button variant="contained" onClick={handleComplete}>Complete Step</Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>

      {/* Completion Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>Your registration is complete!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button onClick={handleReset}>Start Over</Button>
        </DialogActions>
      </Dialog>

      {/* Biometric Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Fingerprint captured successfully"
      />
    </Container>
  );
}
