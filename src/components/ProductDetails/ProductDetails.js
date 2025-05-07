
import { Container, Typography, Box, Grid, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useCart } from "../../context/CartContext"; // Access cart context for add-to-cart functionality
import { useUser } from "../../context/UserContext"; // Access user context for user data and authentication


const ProductDetails = () => {
  const location = useLocation(); // Get location object
  const { item } = location.state || {};
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Function to add item to cart
  const { loadUserData, user } = useUser(); // Load user data and user info
    
    console.log(user);
  // Destructure product information
  const { name, caption, price, url, criteria } = item || {};
  // UI State
    const [open, setOpen] = useState(false); // Dialog open/close
    const [isNewUser, setIsNewUser] = useState(null); // Not used actively, placeholder for future user check
    const [dropdownValue, setDropDownValue] = useState(""); // Placeholder for any dropdown future use
  

  if (!item) {
    return <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>Product details not available.</Typography>;
  }


  // Handle "Buy Now" button click
  const handleOpen = () => {
    if (criteria === "authorized") {
      addToCart(item); // Add item directly if user is authorized
      alert(`${name} is added to cart successfully`);
    } else {
      // If not authorized, show dialog for ID verification
      setOpen(true);
      setIsNewUser(null);
      setDropDownValue("");
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    setIsNewUser(null);
    setDropDownValue("");
  };

  // Handle optional dropdown (not currently shown in UI)
  // const handleDropdownChange = (event) => {
  //   setDropDownValue(event.target.value);
  // };

  // Navigate to verification page
  const handleProceed = () => {
    loadUserData();
    navigate("/selectID", { state: { item } });
  };

  return (
    <Container sx={{ paddingTop: "40px", height: '80vh',  marginTop:"40px",  display: 'flex', flexDirection: 'column'}}>
      <Grid container spacing={3} sx={{ height: '100%',padding:"20px",  display:"flex", justifyContent:'center', boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center",  height: '50%' }}>
          <Box
            component="img"
            src={url}
            alt={name}
            sx={{
              width: "170%",
              height: "170%",
              objectFit: "cover", // Make sure image covers the space
              borderRadius: "8px",
            }}
          />
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>{name}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2, textAlign: "center" }}>{caption}</Typography>
          <Typography variant="h6" color="text.primary" sx={{ marginBottom: 2, textAlign: "center" }}>₹{price}/-</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3, textAlign: "center" }}>Availability: In Stock</Typography>


          {/* Button to add to cart or proceed */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#1976D2",
                padding: "12px 24px",
                borderRadius: "20px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

    
    {/* Dialog for Restricted Products */}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 4,
                p: 2,
                bgcolor: "#fefefe",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DialogTitle
              marginBottom={4}
              sx={{
                bgcolor: "#1976D2",
                color: "#fff",
                textAlign: "center",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                pb: 2,
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography
                  variant="h6"
                  fontWeight={200}
                  sx={{ color: "#e0e0e0", mt: 1 }}
                >
                  ID is required to purchase restricted items.
                </Typography>
              </Box>
            </DialogTitle>
    
            <DialogActions
              sx={{
                px: 3,
                pb: 2,
                pt: 1,
                justifyContent: "space-between",
                borderTop: "1px solid #eee",
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Cancel Button */}
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: "20px",
                  padding: "10px 24px",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Cancel
              </Button>
    
              {/* Proceed Button */}
              <Button
                onClick={handleProceed}
                variant="contained"
                color="primary"
                disabled={isNewUser && !dropdownValue}
                sx={{
                  borderRadius: "20px",
                  padding: "10px 24px",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Look Up IDP
              </Button>
            </DialogActions>
          </Dialog>
    </Container>
  );
};

export default ProductDetails;
