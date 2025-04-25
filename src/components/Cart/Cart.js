import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { useCart } from '../../context/CartContext';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemove = (id) => {
    const confirmed = window.confirm('Are you sure you want to remove this item from the cart?');
    if (confirmed) {
      removeFromCart(id);
    }
  };

  return (
    <Container >
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        🛒 My Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ maxWidth: 345 }}>
                  {item.img && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.img}
                      alt={item.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Price: ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => increaseQuantity(item.id)}>
                        <Add />
                      </IconButton>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(item.id)}
                      sx={{ mt: 2 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'right', mt: 4 }}>
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
