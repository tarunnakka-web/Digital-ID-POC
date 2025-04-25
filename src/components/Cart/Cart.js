import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Cart = () => {
  return (
    <Container >
    <Box  maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop:"120px"  }}>
      <Typography variant="h5" gutterBottom>My Cart</Typography>
      
    </Box>
    </Container>
  );
};

export default Cart;
