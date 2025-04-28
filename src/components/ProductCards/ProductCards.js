import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";

const ProductCards = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropDownValue] = useState("");
  const navigate = useNavigate();
  const { name, url, caption, price, criteria } = item || {};

  const handleOpen = () => {
    if (criteria === "authorized") {
      setOpen(false);
      navigate("/cart", { state: { item } });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdownChange = (event) => {
    setDropDownValue(event.target.value);
  };

  const handleProceed = () => {
    navigate("/register", { state: { item } });
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
      <Typography variant="h6" color="text.primary">Price: ₹{price}</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>Buy Now </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1976D2", color: "#fff", textAlign: "center" }}>
          Restricted Access Alert
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            This content is restricted due to age-sensitive material. Please verify your eligibility to proceed.
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
            Example: “Accessing this content is restricted to users aged 18 or older as per applicable law.”
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", paddingX: 3, paddingBottom: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleProceed} color="primary" disabled={!dropdownValue}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCards;
