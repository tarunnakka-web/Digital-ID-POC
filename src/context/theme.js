import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  palette: {
    mode: 'light',
    primary: { main: '#0081FF' },
    secondary: { main: '#FFC107' },
    background: { default: '#0081FF', paper: '#ffffff' },
    text: { primary: '#333333', secondary: '#555555' },
  },
  typography: {
    fontFamily:'Sans SemiBold,sans-serif',
    h1: { fontSize: '48px', fontWeight: 500, letterSpacing: '-0.5px' , lineHeight:'52px', marginBottom:"20px"},
    h2: { fontSize: '36px', fontWeight: 400, letterSpacing: '-0.5px', lineHeight:"40px",marginBottom:"8px" },
    h3: { fontSize: '30px', fontWeight: 300, letterSpacing: '-0.5px', lineHeight:"34px",marginBottom:"6px" },
    h4: { fontSize: '24px', fontWeight: 250 ,letterSpacing: '-0.5px', lineHeight:"24px", marginBottom:"3px"},
    h5: { fontSize: '18px', fontWeight: 200,letterSpacing: '-0.5px', lineHeight:"40px", marginBottom:"3px" },
    h6: { fontSize: '16px', fontWeight: 100 ,marginBottom:"14px"},
    body1: { fontSize: '16px', lineHeight: "24px",marginBottom:"6px" },
    body2: { fontSize: '12px', lineHeight: "24px" ,marginBottom:"4px"},
    button: { textTransform: 'none', fontWeight: 200,marginBottom:"6px" },
    p1: { fontSize: '14px', lineHeight: 1.8, fontWeight: 400, color: '#444' }, // Paragraph style 1
    p2: { fontSize: '12px', lineHeight: 1.7, fontWeight: 400, color: '#666' }, // Paragraph style 2
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 16px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': { opacity: 0.85 },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '0px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#888',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0081FF',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          fontWeight: 200,
          marginBottom: '2px',
          color: '#333',
          '&.Mui-focused': {
            color: '#0081FF',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          color: '#999',
          marginLeft: 0,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#0081FF',
          '&.Mui-checked': {
            color: '#0081FF',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#0081FF',
          '&.Mui-checked': {
            color: '#0081FF',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#099162' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#099162', color: 'white' },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { borderRadius: '8px', overflow: 'hidden' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600, backgroundColor: '#f0f0f0' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { fontSize: '14px', backgroundColor: '#333' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: '12px', padding: '16px' },
      },
    },
  }
  


});

export default theme;