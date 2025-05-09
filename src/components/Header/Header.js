import React, { useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import userManager from '../../auth/forgerockConfig';
import HomeIcon from '@mui/icons-material/Home';

const pages = ['Home', 'Cart'];
const settings = ['Profile', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { cartItems } = useCart(); //  Get cart items from context
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); //  Sum quantities

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ height: '70px' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for Desktop */}
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            Ecommerce App
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page === 'Home' ? '/' : '/cart'}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {page === 'Cart' ? (
                      <Badge badgeContent={totalCartCount} color="error">
                        <ShoppingCartIcon sx={{ verticalAlign: 'middle' }} /> 
                      </Badge>
                    ) : (
                      
                        <HomeIcon sx={{ verticalAlign: 'middle' }} /> 
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for Mobile */}
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            Shopping App
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:"center" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page === 'Home' ? '/' : '/cart'}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {page === 'Cart' ? (
                  <Badge badgeContent={totalCartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <HomeIcon sx={{ verticalAlign: 'middle' }} />
                )}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                  },
                }}
              >
                <AccountCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 4,
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                  bgcolor: 'background.paper',
                },
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{
                    fontSize: '12px',
                    '&:hover': {
                      bgcolor: '#006A4D',
                      color: 'white',
                    },
                  }}
                >
                  <Typography textAlign="center" sx={{ width: '100%' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;