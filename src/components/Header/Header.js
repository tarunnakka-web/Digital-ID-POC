import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Home, Storefront, ShoppingCart,AccountCircle } from '@mui/icons-material'; // ShoppingCart is imported here
import { Link } from 'react-router-dom';

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>Digital Identification</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, flexGrow: 1 }}>
        <Button component={Link} to="/" color="inherit" startIcon={<Home />}>Home</Button>
        <Button component={Link} to="/products" color="inherit" startIcon={<Storefront />}>Products</Button>
        <Button component={Link} to="/cart" color="inherit" startIcon={<ShoppingCart />}>Cart</Button> 
        <Button component={Link} to="/user-details" color="inherit" startIcon={<AccountCircle />}>UserDetails</Button> 
        
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
