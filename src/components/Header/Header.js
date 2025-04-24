import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Home, Storefront } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>Digital Identification</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, flexGrow: 1 }}>
        <Button component={Link} to="/" color="inherit" startIcon={<Home />}>Home</Button>
        <Button component={Link} to="/products" color="inherit" startIcon={<Storefront />}>Products</Button>
      </Box>
    </Toolbar>
  </AppBar>
)

export default Header
