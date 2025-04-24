import React from 'react';
import { Typography, Box } from '@mui/material';

const Cart = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Typography variant="h5" gutterBottom>My Cart</Typography>
      
    </Box>
  );
};

export default Cart;
