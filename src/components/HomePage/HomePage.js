import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePage = () => (
  <Container  maxWidth="lg" sx={{
    height:"80vh", 
    display:"flex", 
    justifyContent:"center",
    alignItems:"center",
     mt: 8
     }}>
      <Box >
    <Typography variant="h3" gutterBottom>
      Welcome to Digital Identification
    </Typography>
    <Typography variant="h6" >
      Explore our innovative digital identification solutions.
    </Typography>
    <Box marginTop={4}>
    <Button
      variant="contained"
      component={Link}
      to="/products"
      sx={{ mr: 2 }}
    >
      Shop Now
    </Button>
    <Button variant="outlined" component={Link} to="/contact">
      Contact
    </Button>
    </Box>
    </Box>
    <img style={{borderRadius:"20px"}} height="400px" width="500px" src="https://res.cloudinary.com/dpizvs16e/image/upload/v1745559923/digital_identification_image_jrwqvg.jpg" alt="shopping" />
   
  </Container>
)

export default HomePage
