import React, { useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import { useCart } from "../../context/CartContext";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
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
  const { item } = location.state || {};
  console.log(item);
  
  useEffect(() => {
    // Add the item to the cart only once when the component mounts
    if (item && item.id && item.name && item.price) {
      addToCart(item);
    }
  }, [item, addToCart]);

  console.log("cartItems :" + cartItems);

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      removeFromCart(id);
    }
  };

  return (
    <Container>
      <Box sx={{ padding: 3, marginTop: "140px" }}>
        <Typography variant="h4" gutterBottom>
          🛒 My Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {cartItems.map((cartItem) => (
                <Grid item xs={12} sm={6} md={4} key={cartItem.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    {cartItem.img && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={cartItem.img}
                        alt={cartItem.name}
                      />
                    )}
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {cartItem.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Price: ${cartItem.price} × {cartItem.quantity} = $
                        {(cartItem.price * cartItem.quantity).toFixed(2)}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => decreaseQuantity(cartItem.id)}
                          disabled={cartItem.quantity === 1}
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{cartItem.quantity}</Typography>
                        <IconButton
                          onClick={() => increaseQuantity(cartItem.id)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(cartItem.id)}
                        sx={{ mt: 2 }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "right", mt: 4 }}>
              <Button variant="contained" color="error" onClick={clearCart}>
                Clear Cart
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;