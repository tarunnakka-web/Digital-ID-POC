import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useCart } from "../../context/CartContext"; // Access cart context for add-to-cart functionality
import { useUser } from "../../context/UserContext"; // Access user context for user data and authentication
import { Link } from "react-router-dom";

// Component to render individual product card
const ProductCards = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Function to add item to cart
  const { loadUserData, user } = useUser(); // Load user data and user info
  
  console.log(user);

  // UI State
  const [open, setOpen] = useState(false); // Dialog open/close
  const [isNewUser, setIsNewUser] = useState(null); // Not used actively, placeholder for future user check
  const [dropdownValue, setDropDownValue] = useState(""); // Placeholder for any dropdown future use

  // Destructure product info
  const { name, url, caption, price, criteria, id } = item || {};

  // Handle "Buy Now" button click
  const handleOpen1 = () => {
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

  const handleOpen = () => {
    navigate("/product-detail", { state: { item } }); // Passing the clicked product item to the detail page
  }

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
    <Card
    sx={{
      width:"240px" ,
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition:
        "transform 0.3s, box-shadow 0.3s, filter 0.3s",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
        filter: "brightness(1.05)",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
      textAlign: "center",
      overflow: "hidden",
      marginBottom: 2,
      cursor:"pointer",
      // marginRight: "6px",
    }}
    >
      {/* Product Image */}
      <img
        src={url}
        alt={name || "Product"}
        style={{
          width: "210px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "5px",
          marginBottom: "20px",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Product Name */}
      <Typography variant="h6"> {name || "Default Name"}  </Typography>

      {/* Product Description */}
      {/* <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          marginBottom: "14px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {caption}
      </Typography> */}

      {/* Product Price */}
      <Typography  variant="h6" color="primary" > ₹{price}/- </Typography>
       
      {/* Buy Now Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          backgroundColor:"#006A4D" , 
          borderRadius: "20px",
          padding: "10px 24px",
          textTransform: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        View Details
      </Button>

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
    </Card>
  );
};

export default ProductCards;
