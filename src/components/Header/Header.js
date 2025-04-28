import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
// import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
// import Sitemark from './SitemarkIcon';
import {Link} from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters sx={{backgroundColor:"#0288d1"}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:"space-between", alignItems: 'center', px: 0}}> 
            <Typography color="#ffffff" fontWeight={"bold"}>DIGITAL IDENTIFICATION</Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button to="/" component={Link} variant="text" color="#ffffff" size="small">
                Home
              </Button>
              <Button to="/cart" component={Link} variant="text" color="#ffffff" size="small">
                Cart
              </Button>
              <Button to="/user-details" component={Link} variant="text" color="#ffffff" size="small">
                User Details
              </Button>
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}