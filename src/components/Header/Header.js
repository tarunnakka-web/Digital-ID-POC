import * as React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', to: '/' },
    { text: 'Cart', to: '/cart' },
    { text: 'User Details', to: '/user-details' }
  ];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        m: 2
      }}
    >
      <Container maxWidth="xlg">
        <Toolbar
          // variant="dense"
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: '#0288d1',
            boxShadow: 1,
            px: 2,
            borderRadius: '10px'
          }}
        >
          {/* Logo/Title */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            DIGITAL IDENTIFICATION
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                to={item.to}
                component={Link}
                variant="text"
                sx={{ color: '#ffffff' }}
                size="small"
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#ffffff' }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#0288d1'
          }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton sx={{ color: '#ffffff' }} onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.to}
                key={item.text}
                sx={{ color: '#ffffff' }}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
