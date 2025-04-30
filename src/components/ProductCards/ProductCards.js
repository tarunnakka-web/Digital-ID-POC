import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Button, Typography, Dialog, DialogActions, DialogTitle } from "@mui/material";
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
    loadUserData();
    navigate("/verification", { state: { item } });
  };

  return (
    <Card sx={{width:"96%", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s, box-shadow 0.3s, filter 0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)", filter: "brightness(1.05)" }, display: "flex", flexDirection: "column", alignItems: "center", padding: 2, height: "100%", textAlign: "center", transition: "all 0.3s ease", overflow: "hidden" }}>
      <img src={url} alt={name || "Product"} style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "12px", marginBottom: "20px", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }} />
      <Typography variant="h6" sx={{fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#333", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>{name || "Default Name"}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "14px", fontSize: "14px", lineHeight: "1.5", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>{caption}</Typography>
      <Typography variant="h6" color="primary" sx={{ marginBottom: "20px", fontSize: "16px", fontWeight: "bold", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>₹{price}/-</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ borderRadius: "20px", padding: "10px 24px", textTransform: "none", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" } }}>Buy Now</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 2, bgcolor: "#fefefe", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease" } }}>
        <DialogTitle marginBottom={4} sx={{ bgcolor: "#1976D2", color: "#fff", textAlign: "center", borderTopLeftRadius: 8, borderTopRightRadius: 8, pb: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" fontWeight={200} sx={{ color: "#e0e0e0", mt: 1 }}>ID is required to purchase restricted items.</Typography>
          </Box>
        </DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1, justifyContent: "space-between", borderTop: "1px solid #eee", backgroundColor: "#f5f5f5" }}>
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ fontWeight: 600, fontSize: "14px", textTransform: "none", transition: "all 0.3s ease", "&:hover": { backgroundColor: "#f1f1f1" } }}>Cancel</Button>
          <Button onClick={handleProceed} variant="contained" color="primary" disabled={isNewUser && !dropdownValue} sx={{ fontWeight: 600, fontSize: "14px", textTransform: "none", transition: "all 0.3s ease", "&:hover": { backgroundColor: "#1976D2" } }}>Look Up IDP</Button>
        </DialogActions>
      </Dialog>
    </Card>


  );
};

export default ProductCards;
