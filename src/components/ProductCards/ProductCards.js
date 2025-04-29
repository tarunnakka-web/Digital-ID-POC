import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import { useCart } from "../../context/CartContext";  // Import the useCart hook
import { useUser } from "../../context/UserContext";  // Import the useUser hook

const ProductCards = ({ item }) => {
  const { addToCart } = useCart();  // Access addToCart from CartContext
  const { loadUserData, user } = useUser();  // Access loadUserData and user from UserContext
  const [open, setOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(null);
  const [dropdownValue, setDropDownValue] = useState("");
  const navigate = useNavigate();
  const { name, url, caption, price, criteria } = item || {};

  // Handle Buy Now click
  const handleOpen = () => {
    if (criteria === "authorized") {
      addToCart(item);
      alert(`${name} is added to cart successfully`);
    } else {
      setOpen(true);
      setIsNewUser(null);
      setDropDownValue("");
    }
  };

  // Close the dialog and reset state
  const handleClose = () => {
    setOpen(false);
    setIsNewUser(null);
    setDropDownValue("");
  };

  const handleDropdownChange = (event) => {
    setDropDownValue(event.target.value);
  };

  // Proceed after selection
  const handleProceed = () => {
    setOpen(false);
    if (isNewUser) {
      navigate("/register", { state: { item, provider: dropdownValue } });
    } else {
      loadUserData();
      navigate("/login", { state: { item } });
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
         backgroundColor: "#fff",
         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
         transition: "transform 0.3s",
         "&:hover": {
           transform: "scale(1.03)",
         },
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         padding: 2,
         height: "100%",
      }}
    >
      <img src={url} alt={name || "Product"} style={{ width: '200px', height: '200px'}} />
      <h3>{name  || "default name"}</h3>
      <Typography variant="body2" color="text.secondary">{caption}</Typography>
      <Typography variant="h6" color="text.primary">Price: ₹{price}/-</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>Buy Now </Button>

      <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      p: 2,
      bgcolor: "#fefefe",
    },
  }}
>
  <DialogTitle
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
      <Typography variant="h6" fontWeight={600}>
        ⚠️ Restricted Access Alert
      </Typography>
      <Typography variant="caption" sx={{ color: "#e0e0e0", mt: 1 }}>
        Age verification is required to proceed
      </Typography>
    </Box>
  </DialogTitle>

  <DialogContent sx={{ mt: 2 }}>
    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
      Please verify your identity to access this content.
    </Typography>

    {/* User Type Selection */}
    <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} mt={2}>
      <Button
        variant={isNewUser === true ? "contained" : "outlined"}
        color="primary"
        fullWidth
        onClick={() => setIsNewUser(true)}
      >
        I'm a New User
      </Button>
      <Button
        variant={isNewUser === false ? "contained" : "outlined"}
        color="primary"
        fullWidth
        onClick={() => setIsNewUser(false)}
      >
        I'm Already Registered
      </Button>
    </Box>

    {/* Conditional New User Section */}
    {isNewUser && (
      <Box mt={3}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Select ID Verification Provider Type:
        </Typography>
        <Select
          value={dropdownValue}
          onChange={handleDropdownChange}
          fullWidth
          displayEmpty
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
          }}
        >
          <MenuItem value="" disabled>
            Choose an ID provider Type
          </MenuItem>
          <MenuItem value="LloydsID">Lloyds ID Provider</MenuItem>
          <MenuItem value="ProviderA">Provider A</MenuItem>
          <MenuItem value="ProviderB">Provider B</MenuItem>
        </Select>
      </Box>
    )}

    {/* Existing User Message */}
    {!isNewUser && (
      <Box mt={3}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          You're already registered.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click proceed to continue with your existing registration.
        </Typography>
      </Box>
    )}
  </DialogContent>

  <DialogActions
    sx={{
      px: 3,
      pb: 2,
      pt: 1,
      justifyContent: "space-between",
      borderTop: "1px solid #eee",
    }}
  >
    <Button onClick={handleClose} variant="outlined" color="secondary">
      Cancel
    </Button>
    <Button
      onClick={handleProceed}
      variant="contained"
      color="primary"
      disabled={isNewUser && !dropdownValue}
    >
      Proceed
    </Button>
  </DialogActions>
</Dialog>

    </Card>
  );
};

export default ProductCards;
