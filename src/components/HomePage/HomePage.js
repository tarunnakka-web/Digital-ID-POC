import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePage = () => (
  <Container sx={{ textAlign: 'center', mt: 8 }}>
    <Typography variant="h3" gutterBottom>
      Welcome to Digital Identification
    </Typography>
    <Typography variant="h6" >
      Explore our innovative digital identification solutions.
    </Typography>
    <Button
      variant="contained"
      component={Link}
      to="/products"
      sx={{ mr: 2 }}
    >
      Products
    </Button>
    <Button variant="outlined" component={Link} to="/contact">
      Contact
    </Button>   
  </Container>
)

export default HomePage
