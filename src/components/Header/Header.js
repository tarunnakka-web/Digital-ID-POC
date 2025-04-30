import * as React from 'react'; 
import { Box, AppBar, Toolbar, Button, Container, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu'; 
import CloseIcon from '@mui/icons-material/Close'; 
import { Link } from 'react-router-dom';

export default function Header() { 
  // State to manage the open/close status of the Drawer
  const [drawerOpen, setDrawerOpen] = React.useState(false); 

  // Function to toggle the drawer open/close
  const toggleDrawer = (open) => () => { setDrawerOpen(open); }; 

  // Array of navigation items with text and destination routes
  const navItems = [{ text: 'Home', to: '/' }, { text: 'Cart', to: '/cart' }, { text: 'User Details', to: '/user-details' }];

  return (
    <AppBar position="fixed" enableColorOnDark sx={{ boxShadow: 0, bgcolor: 'background.paper', borderRadius: '10px' }}>
      <Container maxWidth="xlg">
        <Toolbar variant="dense" disableGutters sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(24px)', border: '1px solid', borderColor: 'divider', backgroundColor: '#0288d1', boxShadow: 1, padding: '8px 12px', borderRadius: '10px' }}>
          {/* Logo or title of the application */}
          <Typography color="#ffffff" fontWeight="bold">DIGITAL IDENTIFICATION</Typography>
          
          {/* Navigation buttons for larger screens (md and above) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {/* Mapping through navItems to create each button */}
            {navItems.map((item) => (
              <Button key={item.text} to={item.to} component={Link} variant="text" sx={{ color: '#ffffff' }} size="small">{item.text}</Button>
            ))}
          </Box>
          
          {/* IconButton for mobile view (xs) to toggle the Drawer */}
          <IconButton edge="end" sx={{ display: { xs: 'flex', md: 'none' }, color: '#ffffff' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer component that appears in mobile view */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0288d1' }} role="presentation">
          
          {/* Close button for the Drawer */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton sx={{ color: '#ffffff' }} onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* List of navigation items inside the Drawer */}
          <List sx={{ flexGrow: 1 }}>
            {/* Mapping through navItems to create each list item */}
            {navItems.map((item) => (
              <ListItem button component={Link} to={item.to} key={item.text} sx={{ color: '#ffffff' }}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
