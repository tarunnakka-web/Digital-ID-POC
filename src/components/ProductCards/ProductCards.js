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
        borderRadius: "10px",
        marginRight: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "#e4eff7",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <img
        src={url}
        alt={name || "Product"}
        style={{ width: '230px', height: '200px' }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>{name || "default name"}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>{caption}</Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>Price: {price}</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
        Buy Now
      </Button>

      {/* Dialog for restricted access */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#1976D2", color: "#ffffff" }}>
          Restricted Access Alert
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Access to this content is restricted. Please indicate whether you are a new user or already registered.
          </Typography>

          {/* New vs Existing User Buttons with dynamic variant */}
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant={isNewUser === true ? "contained" : "outlined"}
              onClick={() => setIsNewUser(true)}
            >
              New User
            </Button>
            <Button
              fullWidth
              variant={isNewUser === false ? "contained" : "outlined"}
              onClick={() => setIsNewUser(false)}
              sx={{ mt: 2 }}
            >
              Already Registered
            </Button>
          </Box>

          {/* Dropdown for New Users */}
          {isNewUser && (
            <Box sx={{ mt: 2 }}>
              <Select
                value={dropdownValue}
                onChange={handleDropdownChange}
                fullWidth
                displayEmpty
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
              >
                <MenuItem value="" disabled>
                  Please Select ID Provider
                </MenuItem>
                <MenuItem value="LloydsID">Lloyds ID Provider</MenuItem>
                <MenuItem value="Provider - A">Provider - A</MenuItem>
                <MenuItem value="Provider - B">Provider - B</MenuItem>
              </Select>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="secondary">
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
