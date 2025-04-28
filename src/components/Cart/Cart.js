import React, { useEffect } from "react";
import { Typography, Box, Container, Button, Card, CardContent, IconButton } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const location = useLocation();
  const { item } = location.state || {}; // Get item from location.state

  

  useEffect(() => {
    // Add the item to the cart only once when the component mounts
    if (item && item.id && item.name && item.price) {
      addToCart(item);
    }
  }, [item, addToCart]);

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      removeFromCart(id);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "100px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        My Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // This will wrap the cards to the next line when the container is full
            justifyContent: "start", // Add space between items
          }}
        >
          {/* Loop through cart items and display each item in a Card */}
          {cartItems.map((cartItem) => {
            console.log(cartItem) ; 
            const { name, url, caption, price, quantity, id } = cartItem || {};
            

            return (
              <Card
                key={id}
                sx={{
                  maxWidth: 345,
                  marginBottom: 2,
                  marginRight:"10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#e4eff7",
                }}
              >
                {/* Display Image */}
                {url && (
                  <img
                    src={url}
                    alt={name || "Product"}
                    style={{ width: "230px", height: "200px", objectFit: "cover" }}
                  />
                )}

                {/* Product Name */}
                <Typography variant="h6">{name || "Default Name"}</Typography>

                {/* Product Caption */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, fontWeight: "normal", fontSize: "16px" }}
                >
                  {caption || "No caption available"}
                </Typography>

                {/* Product Price */}
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ mt: 2, fontWeight: "normal", fontSize: "16px" }}
                >
                  Price: {price || "0.00"}
                </Typography>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                  <IconButton
                    onClick={() => decreaseQuantity(id)}
                    disabled={quantity === 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton onClick={() => increaseQuantity(id)}>
                    <Add />
                  </IconButton>
                </Box>

                {/* Remove Button */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(id)}
                  sx={{ mt: 2 }}
                >
                  Remove
                </Button>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
