import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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
  const { item } = location.state || {};

  useEffect(() => {
    if (item && item.id && item.name && item.price) {
      addToCart(item);
    }
  }, [item, addToCart]);

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) removeFromCart(id);
  };


  const getTotal = () => cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Simulate checkout action
    alert("Checkout successful! Thank you for your purchase.");
    clearCart();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: "#333",
        }}
      >
        My Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {cartItems.map((cartItem) => {
            const { id, name, url, caption, price, quantity } = cartItem || {};

            return (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  gap: 3,
                  p: 1,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#fafafa",
                  alignItems: "flex-start",
                }}
              >
                {url && (
                  <Box
                    component="img"
                    src={url}
                    alt={name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1.5,
                    }}
                  />
                )}
                <Box flex={1}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {name}
                    </Typography>

                    <Box display="flex" alignItems="center" justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => decreaseQuantity(id)}
                        disabled={quantity === 1}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => increaseQuantity(id)}>
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {caption && (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {caption}
                    </Typography>
                  )}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                  >
                    <Typography variant="h6" color="primary">
                      ₹{price }
                    </Typography>

                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleRemove(id)}
                      sx={{ fontWeight: "bold", textTransform: "none" }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ₹{getTotal()}
            </Typography>
          </Box>

          <Box textAlign="right" display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={clearCart}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Clear Cart
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                },
              }}
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
