import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Password } from '@mui/icons-material';
import FingerprintPage from '../Fingerprint/Fingerprint';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal information', 'Document Submission', 'email Verification',"Biometric Verification"];

export default function HorizontalNonLinearStepper() {
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
    password : '', 
    confirmPassword : ""
  });
  const [errors, setErrors] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newErrors = {};

    // Validate current step
    if (activeStep === 0) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
      if (!formData.address) newErrors.address = "Address is required";
    } else if (activeStep === 1) {
      if (!formData.documentType) newErrors.documentType = "Document Type is required";
      if (!formData.documentFile) newErrors.documentFile = "Document File is required";
    } else if (activeStep === 2) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Email is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Email is required";
    }else if (activeStep === 3){
      if (!formData.documentType) newErrors.documentType = "Document Type is required";
      if (!formData.documentFile) newErrors.documentFile = "Document File is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent navigation to next step
    }

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (completedSteps() === totalSteps() - 1) {
      setOpenDialog(true); // Open the dialog when all steps are completed
    }
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();

    if (activeStep === 0){
      if (formData.firstName !== "" && formData.lastName !== "" && formData.gender !== "" && formData.dob !== "" && formData.phoneNumber !== "" && formData.address !== ""){
        setCompleted({
          ...completed,
          [activeStep]: true,
        });
        handleNext();   
      }
    }else if (activeStep === 1){
      if (formData.documentType !== "" && formData.documentFile !== "" ){
        setCompleted({
          ...completed,
          [activeStep]: true,
        });
        handleNext();  
      }
    }else if (activeStep === 2){
      if (formData.email !== "" && formData.password !== "" && formData.confirmPassword !== ""){
        setCompleted({
          ...completed,
          [activeStep]: true,
        });
        handleNext();  
      }
    }
    else if (activeStep === 3){ 
      if (formData.documentType !== "" && formData.documentType === null){
      setCompleted({
          ...completed,
          [activeStep]: true,
        });
        handleNext(); 
    }
  }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      phoneNumber: "",
      address: "",
      documentType: "",
      documentFile: null,
      email : "", 
      password : '',
      confirmPassword : '' ,
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documentFile: e.target.files[0],
      }));
    }
  };

  const handleBiometricCapture = async () => {
    try {
      // Example: Simulate biometric capture (replace this with real WebAuthn if needed)
      // Here, you would integrate real biometric auth like WebAuthn APIs
      const fakeBiometricCredential = {
        id: 'sample-biometric-id',
        timestamp: new Date().toISOString(),
      };
      // Simulate a successful biometric capture
      setFormData((prev) => ({
        ...prev,
        biometricCaptured: true,
        biometricCredential: fakeBiometricCredential,
      }));
    } catch (error) {
      console.error("Biometric capture failed:", error);
      alert("Failed to capture biometric . Please try again.");
    }
  };

  const handleFingerprintCapture = async () => {
    try {
      // Simulate fingerprint capture process (replace with actual fingerprint capture logic)
      const fakeFingerprintCredential = {
        id: 'sample-fingerprint-id',
        timestamp: new Date().toISOString(),
      };
  
      // Simulating a fingerprint capture success
      setFormData((prev) => ({
        ...prev,
        fingerprintCaptured: true,
        fingerprintCredential: fakeFingerprintCredential,
      }));
  
      // You could add a condition to simulate failure
      const captureSuccess = Math.random() > 0.2; // 80% chance of success
      if (captureSuccess) {
        alert("Fingerprint captured successfully ");
      } else {
        throw new Error("Fingerprint capture failed due to device error.");
      }
    } catch (error) {
      console.error("Fingerprint capture failed:", error);
      alert(`Failed to capture fingerprint ❌. Reason: ${error.message}`);
    }
  };
  

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '140px' }}>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, marginTop:"30px" }}>
                  <TextField sx={{marginBottom:"20px"}} label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={Boolean(errors.firstName)} helperText={errors.firstName} required />
                  <TextField sx={{marginBottom:"20px"}} label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={Boolean(errors.lastName)} helperText={errors.lastName} required />
                  <FormControl sx={{marginBottom:"20px"}} fullWidth required error={Boolean(errors.gender)}>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                      <MenuItem value="">-- Select Gender --</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <Typography color="error" variant="caption">{errors.gender}</Typography>
                  </FormControl>
                  <TextField sx={{marginBottom:"20px"}} label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} error={Boolean(errors.dob)} helperText={errors.dob} required />          
                  <TextField sx={{marginBottom:"20px"}} label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={Boolean(errors.phoneNumber)} helperText={errors.phoneNumber} required />
                  <TextField sx={{marginBottom:"20px"}} label="Address" name="address" value={formData.address} onChange={handleChange} error={Boolean(errors.address)} helperText={errors.address} required />       
                  </Box>
              )}

              {activeStep === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, marginTop:"30px" }}>
                <FormControl sx={{marginBottom:"20px"}} fullWidth required error={Boolean(errors.documentType)}>
                  <InputLabel>Document Type</InputLabel>
                  <Select name="documentType" value={formData.documentType} onChange={handleChange} label="Document Type">
                    <MenuItem value="">-- Select Document Type --</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="drivingLicense">Driving License</MenuItem>
                  </Select>
                  <Typography color="error" variant="caption">{errors.documentType}</Typography>
                </FormControl>
                <input sx={{marginBottom:"20px"}} type="file" onChange={handleFileChange} required />
                {errors.documentFile && <Typography color="error" variant="caption">{errors.documentFile}</Typography>}
              </Box>

              )}
              {activeStep === 2 &&(
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, marginTop:"30px" }}>
                <TextField sx={{marginBottom:"20px"}} type="email" label="Email" name="email" value={formData.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} required />
                <TextField sx={{marginBottom:"20px"}} type='password' label="password" name="password" value={formData.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} required />
                <TextField sx={{marginBottom:"20px"}} type='password' label="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword} required />
             </Box>
              )}

              {activeStep === 3 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, marginTop:"10px" }}>
                 
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1}}> Biometric Authentication</Typography>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={handleBiometricCapture}
                        >
                      Capture Biometric
                      </Button>

                        {/* Show result after capture */}
                  {formData.biometricCaptured && (<Typography variant="body2" color="success.main" sx={{ mt: 1, mb:3 }}>Biometric Captured Successfully  </Typography> )}  
                </FormControl>
                </Box>
              )}    

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep !== 3 && 
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button> }
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle sx={{ textAlign: "center", p: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 60, color: "green", mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                  Registration Successful
                  </Typography>
            </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
                    <DialogContentText sx={{ fontSize: "18px" }}>
                  Your completed registration, we will respond shortly.
        </DialogContentText>
          </DialogContent>
              <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button variant="contained" color="success" onClick={() => setOpenDialog(false)}>
                 OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
