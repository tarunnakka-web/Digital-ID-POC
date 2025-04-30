import React, { useEffect } from "react"; 
import { Typography, Box, Container, Button, Card, IconButton } from "@mui/material"; 
import { useCart } from "../../context/CartContext"; 
import { Add, Remove } from "@mui/icons-material"; 
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const location = useLocation();
  const { item } = location.state || {}; // Get item from location.state

  useEffect(() => { if (item && item.id && item.name && item.price) addToCart(item); }, [item, addToCart]);

  const handleRemove = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmed) removeFromCart(id);
  };

  return (
    <Container maxWidth="xlg" sx={{ marginTop: "80px" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: "40px", textAlign: 'center', marginTop: "6px", fontSize: "20px" }}>My Cart</Typography>
      {cartItems.length === 0 ? <Typography variant="body1" sx={{textAlign:"center"}}>Your cart is empty.</Typography> : (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}>
          {cartItems.map((cartItem) => {
            const { name, url, caption, price, quantity, id } = cartItem || {};
            return (
              <Card key={id} sx={{
                 borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s, box-shadow 0.3s, filter 0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)", filter: "brightness(1.05)" }, display: "flex", flexDirection: "column", alignItems: "center", padding: 2, height: "auto", textAlign: "center", transition: "all 0.3s ease", overflow: "hidden", marginBottom: 2, marginRight: "10px"
              }}>
                {url && <img src={url} alt={name || "Product"}  style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "12px", marginBottom: "20px", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }} />}
                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#333", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>{name || "Default Name"}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "14px", fontSize: "14px", lineHeight: "1.5", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>{caption || "No caption available"}</Typography>
                <Typography variant="h6" color="primary" sx={{ marginBottom: "8px", fontSize: "16px", fontWeight: "bold", transition: "color 0.3s ease", "&:hover": { color: "#1976D2" } }}>₹{price || "0.00"}/-</Typography>
                <Box display="flex" alignItems="center" gap={1} >
                  <IconButton onClick={() => decreaseQuantity(id)} disabled={quantity === 1}><Remove /></IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton onClick={() => increaseQuantity(id)}><Add /></IconButton>
                </Box>
                <Button variant="outlined" color="error" onClick={() => handleRemove(id)} sx={{ mt:0, borderRadius: "20px", padding: "10px 24px", textTransform: "none", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" } }}>Remove</Button>
              </Card>
            );
          })}
        </Box>
      )}
      {cartItems.length > 0 && 
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button variant="contained" color="error" onClick={clearCart} sx={{ borderRadius: "20px", padding: "10px 24px", textTransform: "none", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" } }}>Clear Cart</Button>
        </Box>}
    </Container>
  );
};

export default CartPage;
