import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  Collapse,
  FormControl,
  InputLabel
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectID = () => {
  const [idList, setIdList] = useState([]);
  const [dropdownValue, setDropDownValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  console.log(idList);

  useEffect(() => {
    const fetchData = async () => {
      try{ 
    const url = "http://localhost:8080/api/idps/list";
    const response = await fetch(url);
    const data = await response.json();
    setIdList(data);
    }
      catch(e){
        console.error("fetching data: ", e);
      }

    }
    fetchData()
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!dropdownValue) {
      setError('Please select an ID provider.');
      return;
    }

    navigate('/login', { state: { selectedProvider: dropdownValue } });
  };

  const handleDropdownChange = (e) => {
    setDropDownValue(e.target.value);
    if (error) setError('');
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
      sx={{ backgroundColor: '#f0f2f5' }}
    >
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
        {/* Header section with a check icon and title */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 4, backgroundColor:"#006a4d", padding:3 }}>
            <CheckCircleIcon sx={{ fontSize: 35, color:"#ffffff" }} />
            <Typography variant='h4' sx={{ fontSize: 30, color:"#ffffff" }} fontWeight={"bold"}>Select ID</Typography>
          </Box>

        <form onSubmit={handleSubmit} noValidate>
          <FormControl 
           fullWidth
           sx={{
            mb: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
            '& .MuiInputLabel-root': {
              color: '#006a4d', // default label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#006a4d', // focused label color
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006a4d', // default border
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006a4d', // hover border
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006a4d', // focus border
            },
          }} 
           error={Boolean(error)}
           >
            
            <InputLabel id="provider-label">ID Provider</InputLabel>
            <Select
              labelId="provider-label"
              id="provider-select"
              value={dropdownValue}
              label="ID Provider"
              onChange={handleDropdownChange}
              aria-describedby="provider-helper-text"
              sx={{
                backgroundColor: "#f5f5f5", 
                borderRadius:"6px",
              }}
            >
             
              {idList.length > 0 ? 
              ( idList.map((each) => (
                 <MenuItem sx={{fontSize:"14px"}} value="LloydsID">{each.displayName}</MenuItem>
              ))) : 
              <MenuItem sx={{fontSize:"14px"}} value="LloydsID">Lloyds ID</MenuItem>
            } 
            </Select>
          </FormControl>

          <Collapse in={Boolean(error)}>
            <Typography
              id="provider-helper-text"
              color="error"
              variant="body2"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          </Collapse>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!dropdownValue}
            sx={{ mt: 1, textTransform: 'none', fontWeight: 'bold' , backgroundColor:"#006A4D" }}
          >
            Select
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SelectID;
