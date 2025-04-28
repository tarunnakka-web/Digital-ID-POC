import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem} from "@mui/material";
import { useCart } from "../../context/CartContext";  // Import the useCart hook

const ProductCards = ({ item }) => {  // Destructure item properly from props
  const { addToCart } = useCart();  // Access addToCart from CartContext
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropDownValue] = useState("");
  const navigate = useNavigate();
  const {name, url, caption, price, criteria} = item.item || {};

  const handleOpen = () => {
    if (criteria === "authorized") {
      addToCart(item);  // Add item to the cart if authorized
      alert(`${name} is added to cart successfully`)
      // navigate("/cart", { state: { item } });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDropDownValue("");  // Reset dropdown value when dialog is closed
  };
  

  const handleDropdownChange = (event) => {
    setDropDownValue(event.target.value);
  };

  const handleProceed = () => {
    navigate("/register", {state: {item}}); // Navigate to the cart page with item data
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
      <img src={url} alt={name || "Product"} style={{ width: '200px', height: '200px'}} />
      <h3>{name  || "default name"}</h3>
      <Typography variant="body2" color="text.secondary">{caption}</Typography>
      <Typography variant="h6" color="text.primary">Price: ₹{price}</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>Buy Now </Button>

      {/* Dialog Component */}
      <Dialog open={open} padding="10px" onClose={handleClose} maxWidth="sm" fullWidth border="1px solid #e4eff7">
        {/* Dialog Title */}
        <DialogTitle sx={{bgcolor:"#1976D2", marginBottom:"20px"}}>
          <Typography variant="h6" color="#ffffff">
            Restricted Access Alert
          </Typography>
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Access to this content is restricted due to age-sensitive material. Kindly verify your eligibility to proceed.
          </Typography>

          {/* Dropdown */}
          <Box sx={{ mt: 2 }}>
            <Select
              value={dropdownValue}
              onChange={handleDropdownChange}
              fullWidth
              displayEmpty
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
            >
              <MenuItem value="" disabled>
                Please Select an Option
              </MenuItem>
              <MenuItem value="1">Lloyds ID Provider</MenuItem>
              <MenuItem value="2">Provider - A</MenuItem>
              <MenuItem value="3">Provider - B</MenuItem>
            </Select>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            "Example: Users must be at least 18 years old to access this content, in compliance with applicable legal requirements."
          </Typography>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary" aria-label="Cancel Button">
            Cancel
          </Button>

          <Button onClick={handleProceed} color="primary" disabled={!dropdownValue || dropdownValue === ""}>
            Proceed
          </Button>

        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCards;
