import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, TextField, Button, Input,InputLabel, FormHelperText, Modal, Typography } from '@mui/material';


// Step titles
const steps = ['User Basic Details', 'Identity Verification (KYC)', 'Documents Submission'];

const RegistrationForm = () => {
  // State hooks to manage form step, form data, error messages, and modal visibility
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', country: '',
    aadhaar: '', passport: '', pan: '', idProof: null, addressProof: null, additionalDocuments: null
  });
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);  // Modal visibility state

  // Handle text field change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle file input change
  const handleFileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  // Validate required fields based on the current step
  const validateFields = () => {
    const requiredFields = activeStep === 0 ? ['fullName', 'email', 'phone', 'address', 'country'] :
                           activeStep === 1 ? ['aadhaar', 'passport', 'pan'] : 
                           ['idProof', 'addressProof', 'additionalDocuments'];

    // Check if any required fields are empty
    const tempErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field]) acc[field] = `${field} is required`;
      return acc;
    }, {});

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => { if (validateFields()) setActiveStep((prev) => prev + 1); };

  // Handle previous step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Render the input fields for a given list of fields
  const renderFields = (fields) => (
    fields.map((field) => (
      <TextField
        key={field} label={field} name={field} value={formData[field]} onChange={handleChange}
        fullWidth required sx={{ mb: 2 }} error={!!errors[field]} helperText={errors[field]}
      />
    ))
  );

 

  // Render file inputs for a given list of fields
  const renderFileInputs = (fields) => (
    fields.map((field) => (
      <Box key={field} sx={{ mb: 2 }}>
        <InputLabel htmlFor={field}>{field}</InputLabel>
        <Input id={field} type="file" name={field} onChange={handleFileChange} fullWidth required />
        {errors[field] && <FormHelperText error>{errors[field]}</FormHelperText>}
      </Box>
    ))
  );


  // Handle form submission and show details in a popup
  const handleSubmit = () => {
    if (validateFields()) {
      const formDataToStore = { ...formData };
  
      // Handle file fields by saving only file name or a message
      const handleFileField = (fieldName) => {
        const value = formData[fieldName];
        if (value instanceof File) {
          formDataToStore[fieldName] = value.name; // Save file name
        } else if (value && Object.keys(value).length === 0) {
          formDataToStore[fieldName] = 'No file uploaded'; // Handle empty file objects
        }
      };
  
      // Handle the file input fields
      ['idProof', 'addressProof', 'additionalDocuments'].forEach(handleFileField);
  
      // Save data to localStorage (check for existing users array)
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      existingUsers.push(formDataToStore);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
  
      setOpenModal(true);
    }
  };
  
  
  

  // Close the modal
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container > 
    <Box  maxWidth="lg" sx={{ width: '100%', padding: 2, marginTop:"120px"  }}>
      {/* Stepper component */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label, index) => <Step key={index}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {/* Render content based on active step */}
      {activeStep === 0 && (
        <Box sx={{ padding: 2 }}>
          {renderFields(['fullName', 'email', 'phone', 'address', 'country'])}
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ padding: 2 }}>
          {renderFields(['aadhaar', 'passport', 'pan'])}
          <Button variant="contained" onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ padding: 2 }}>
          {renderFileInputs(['idProof', 'addressProof', 'additionalDocuments'])}
          <Button variant="contained" onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      )}

      {/* Modal to display form details on successful submission */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3, width: 400
        }}>
          <Typography variant="h6">Form Details</Typography>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <Typography variant="h6" sx={{ mt: 2, color: 'green' }}>New user registration has been successfully completed!</Typography>
          <Button variant="contained" onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
    </Container>
  );
};

export default RegistrationForm;
