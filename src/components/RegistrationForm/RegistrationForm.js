// Same imports as before
import React, {  useState } from 'react';
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
  Paper,InputAdornment, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const steps = ['Personal Information', 'Document Submission', 'Set Password', 'Biometric Verification'];

export default function HorizontalNonLinearStepper() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    address: '',
    documentType: '',
    documentFile: null,
    email: '',
    password: '',
    confirmPassword: '',
    biometricCaptured: false,
  });
  const [errors, setErrors] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const updatedCompleted = { ...completed, [activeStep]: true };
    setCompleted(updatedCompleted);

    if (completedSteps() === totalSteps() - 1) {
      setOpenDialog(true);
    } else {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      phoneNumber: '',
      address: '',
      documentType: '',
      documentFile: null,
      email: '',
      password: '',
      confirmPassword: '',
      biometricCaptured: false,
    });
    setErrors({});
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        documentFile: file,
      }));
      setErrors((prev) => ({
        ...prev,
        documentFile: '',
      }));
    }
  };

  const handleBiometricCapture = () => {
    // Then navigate after updating state
    navigate("/finger-print-Scanner")
    // Update formData first
    setFormData((prev) => ({
      ...prev,
      biometricCaptured: true,
    }));
  
    
  };
  

  const validateStep = (step) => {
    const newErrors = {};
    const {
      firstName,
      lastName,
      gender,
      dob,
      phoneNumber,
      address,
      documentType,
      documentFile,
      email,
      password,
      confirmPassword,
      biometricCaptured,
    } = formData;

    if (step === 0) {
      if (!firstName.trim()) newErrors.firstName = 'First name is required';
      if (!lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!gender) newErrors.gender = 'Gender is required';
      if (!dob) newErrors.dob = 'Date of birth is required';
      if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!address.trim()) newErrors.address = 'Address is required';
    }

    if (step === 1) {
      if (!documentType) newErrors.documentType = 'Please select a document type';
      if (!documentFile) newErrors.documentFile = 'Document upload is required';
    }

    if (step === 2) {
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!email.includes('@')) {
        newErrors.email = 'Enter a valid email address';
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (!biometricCaptured) {
        newErrors.biometricCaptured = 'Please complete biometric verification';
      }
    }

    return newErrors;
  };

  return (
    <Container maxWidth="xlg" sx={{ mt: 10, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper nonLinear activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {allStepsCompleted() ? (
          <>
            <Typography variant="h6" gutterBottom align="center">
              All steps completed - you’re finished
            </Typography>
            <Box display="flex" justifyContent="center">
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box component="form" noValidate autoComplete="off">
              {activeStep === 0 && (
                <>
                  <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" error={!!errors.firstName} helperText={errors.firstName} />
                  <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" error={!!errors.lastName} helperText={errors.lastName} />
                  <FormControl fullWidth margin="normal" error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}
                  </FormControl>
                  <TextField fullWidth type="date" name="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="normal" error={!!errors.dob} helperText={errors.dob} />
                  <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                  <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" error={!!errors.address} helperText={errors.address} />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <FormControl fullWidth margin="normal" error={!!errors.documentType}>
                    <InputLabel>Document Type</InputLabel>
                    <Select name="documentType" value={formData.documentType} onChange={handleChange} label="Document Type">
                      <MenuItem value="">Select Document</MenuItem>
                      <MenuItem value="passport">Passport</MenuItem>
                      <MenuItem value="aadhaar">Aadhaar Card</MenuItem>
                      <MenuItem value="license">Driving License</MenuItem>
                    </Select>
                    {errors.documentType && <Typography color="error" variant="caption">{errors.documentType}</Typography>}
                  </FormControl>
                  <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                    Upload Document
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {errors.documentFile && <Typography color="error" variant="caption">{errors.documentFile}</Typography>}
                </>
              )}

              {activeStep === 2 && (
                <>
                  <TextField fullWidth type="email" label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" error={!!errors.email} helperText={errors.email} />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}/>  </>
              )}

              {activeStep === 3 && (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>Biometric Authentication</Typography>
                  <Button onClick={handleBiometricCapture} variant="contained" fullWidth sx={{ marginTop: 1, padding: '10px 0', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
                    Scan Fingerprint
                  </Button>
                  
                  {formData.biometricCaptured && <Typography sx={{ mt: 2 }} color="success.main">Fingerprint Captured Successfully</Typography>}
                  {errors.biometricCaptured && <Typography color="error">{errors.biometricCaptured}</Typography>}
                </>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box>
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                <Button variant="contained" onClick={handleComplete}>
                  Complete Step
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Registration Completed</DialogTitle>
        <DialogContent>
          <DialogContentText>All steps have been successfully completed!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button onClick={handleReset}>Reset</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
