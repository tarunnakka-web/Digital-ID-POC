import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

/**
 * CartPage component handles display and interactions with the user's shopping cart.
 */
const CartPage = () => {
  // Destructuring cart-related actions and state from custom cart context
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Getting item passed via navigation state
  const location = useLocation();
  const { item } = location.state || {};

  /**
   * Automatically adds item to cart if passed via route state and contains necessary data.
   */
  useEffect(() => {
    if (item && item.id && item.name && item.price) {
      addToCart(item);
    }
  }, [item, addToCart]);

  /**
   * Prompts confirmation and removes item from cart.
   * @param {string} id - ID of the item to remove
   */
  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) removeFromCart(id);
  };

  return (
    <Container maxWidth="xlg" sx={{ marginTop: "80px" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center",
          marginTop: "6px",
          fontSize: "20px",
        }}
      >
        My Cart
      </Typography>

      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
          }}
        >
          {/* Render each cart item */}
          {cartItems.map((cartItem) => {
            const { name, url, caption, price, quantity, id } = cartItem || {};

            return (
              <Card
                key={id}
                sx={{
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
                  marginRight: "10px",
                }}
              >
                {/* Product image */}
                {url && (
                  <img
                    src={url}
                    alt={name || "Product"}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "20px",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}

                {/* Product name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    color: "#333",
                  }}
                >
                  {name || "Default Name"}
                </Typography>

                {/* Product caption/description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginBottom: "14px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {caption || "No caption available"}
                </Typography>

                {/* Product price */}
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ₹{price || "0.00"}/-
                </Typography>

                {/* Quantity controls */}
                <Box display="flex" alignItems="center" gap={1}>
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

                {/* Remove button */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(id)}
                  sx={{
                    mt: 0,
                    borderRadius: "20px",
                    padding: "10px 24px",
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  Remove
                </Button>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Clear all items in cart */}
      {cartItems.length > 0 && (
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            onClick={clearCart}
            sx={{
              borderRadius: "20px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
