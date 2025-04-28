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
      <Box 
        component="img"
        src={url}
        alt={name || "Product"}
        sx={{ 
          width: "100%", 
          height: 200, 
          objectFit: "contain", 
          marginBottom: 2 
        }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {name || "Default Name"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginY: 1 }}>
          {caption}
        </Typography>
        <Typography variant="h6" color="primary">
          ₹{price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOpen}
          sx={{ fontWeight: 600, marginTop:"0px" }}
        >
          Buy Now
        </Button>
      </CardActions>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1976D2", color: "#fff", textAlign: "center" }}>
          Restricted Access Alert
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This content is restricted due to age-sensitive material. Please verify your eligibility.
          </Typography>

          <Select
            value={dropdownValue}
            onChange={handleDropdownChange}
            fullWidth
            displayEmpty
            sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px", marginBottom: 2 }}
          >
            <MenuItem value="" disabled>
              Please Select an Option
            </MenuItem>
            <MenuItem value="1">Select ID</MenuItem>
            <MenuItem value="2">Option A</MenuItem>
            <MenuItem value="3">Option B</MenuItem>
          </Select>

          <Typography variant="caption" color="text.secondary">
            Example: Accessing this content is restricted to users aged 18 or older.
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
