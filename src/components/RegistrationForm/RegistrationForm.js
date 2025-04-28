import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
  TextareaAutosize,
  Box,
  Alert,
  Container
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


function ContactForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    email: "",
    phone: "",
    address: "",
    identityDocumentFile:null,
    state: "",
    comment: "",
  });

  // State for validation messages
  const [successMessage, setSuccessMessage] = useState(false);

  // Event handler for form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validation: Check for empty fields
    const areFieldsFilled = Object.values(formData).every((value) => {
      // Check if value is a string
      if (typeof value === "string") {
        return value.trim() !== ""; // Use trim() only for strings
      }
      // Handle non-string values (e.g., file uploads, dates)
      return value !== null && value !== undefined;
    });
  
    if (areFieldsFilled) {
      setSuccessMessage(true);
      console.log("Form Data Submitted:", formData);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      identityDocumentFile: event.target.files[0], // Capture the uploaded file
    }));
  };

  return (
    <Container
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Changed "start" to "flex-start" for proper CSS value
    width: "75%",
    marginTop: "140px",
    border: "1px solid #e4eff7",
  }}
>
    <Box sx={{ 
      padding: "20px", maxWidth: "600px"}}>
      <Typography variant="h4" sx={{ marginBottom: "20px"}}>
         Identity Verification Form
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: "20px" }}>
          Thanks for contacting us! We will get back to you shortly.
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        />

        {/* Last Name */}
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        />
        
        {/* Date of Birth */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(newValue) =>
          setFormData((prevState) => ({
            ...prevState,
            dateOfBirth: newValue,
          }))
        }   
        sx={{ marginBottom: "16px" }} 
        />
        </LocalizationProvider>


        {/* Email */}
        <TextField
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        />

        {/* Phone */}
        <TextField
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        />

        {/* Address */}
        <TextField
          name="address"
          label="Street Address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        />

        {/* City */}
        {/* <TextField
          name="city"
          label="City"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: "16px" }}
        /> */}

        {/* State Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <Select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Please select your state
            </MenuItem>
            {[
              "Alabama",
              "Alaska",
              "Arizona",
              "Arkansas",
              "California",
              "Colorado",
              "Connecticut",
              "Delaware",
              "District of Columbia",
              "Florida",
              "Georgia",
              "Hawaii",
              "Idaho",
              "Illinois",
              "Indiana",
              "Iowa",
              "Kansas",
              "Kentucky",
              "Louisiana",
              "Maine",
              "Maryland",
              "Massachusetts",
              "Michigan",
              "Minnesota",
              "Mississippi",
              "Missouri",
              "Montana",
              "Nebraska",
              "Nevada",
              "New Hampshire",
              "New Jersey",
              "New Mexico",
              "New York",
              "North Carolina",
              "North Dakota",
              "Ohio",
              "Oklahoma",
              "Oregon",
              "Pennsylvania",
              "Rhode Island",
              "South Carolina",
              "South Dakota",
              "Tennessee",
              "Texas",
              "Utah",
              "Vermont",
              "Virginia",
              "Washington",
              "West Virginia",
              "Wisconsin",
              "Wyoming",
            ].map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* File Upload Field */}
        <FormControl fullWidth required sx={{ marginBottom: "16px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload (Passport / Driving Licence):
          </Typography>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf" // Restrict file types
            onChange={handleFileChange}
            style={{ marginBottom: "8px" }}
          />
          {formData.identityDocumentFile && (
            <Typography variant="body2">
              File Selected: {formData.identityDocumentFile.name}
            </Typography>
          )}
        </FormControl>



        {/* Project Description */}
        <TextareaAutosize
          name="comment"
          minRows={3}
          placeholder="Identification Description"
          value={formData.comment}
          onChange={handleInputChange}
          style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
          required
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </form>
    </Box>
    </Container>
  );
}

export default ContactForm;