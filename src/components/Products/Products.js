import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, Typography, Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from '@mui/material';
import { useCart } from '../../context/CartContext';

const Products = () => {
  // State for handling the dialog visibility, selected item, and user authorization
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [authorizedUser, setAuthorizedUser] = useState(true);  // This should be dynamically set based on actual user authentication

  const navigate = useNavigate();
  const { addToCart } = useCart();


  // Sample authorized products
  const authorized = [
    { id: 1, name: 'Smartphone', img: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg' },
    { id: 2, name: 'Headphones', img: 'https://images.pexels.com/photos/159853/headphones-headset-audio-equipment-159853.jpeg' },
    { id: 3, name: 'Laptop', img: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
    { id: 4, name: 'Smartwatch', img: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg' }
  ];

  // Sample unauthorized products
  const unauthorized = [
    { id: 5, name: 'Gun', img: 'https://images.pexels.com/photos/164618/pexels-photo-164618.jpeg' },
    { id: 6, name: 'Drugs', img: 'https://images.pexels.com/photos/365209/pexels-photo-365209.jpeg' },
    { id: 7, name: 'Knife', img: 'https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg' },
    { id: 8, name: 'Explosives', img: 'https://images.pexels.com/photos/1115684/pexels-photo-1115684.jpeg' }
  ];

  // Open the dialog and set the selected item
  const openBuyDialog = (item, isUnauthorized) => {
    setSelectedItem(item);
    setDialogOpen(true);
    if (isUnauthorized) {
      setAuthorizedUser(false);
    } else {
      setAuthorizedUser(true);
    }
  };

  // Handle the confirmation and perform the buy action
  const handleConfirmBuy = () => {
    if (selectedItem) {
      addToCart(selectedItem); // Add item to cart
      alert(`Successfully added "${selectedItem.name}" to cart.`);
    }
    setDialogOpen(false);
    setSelectedItem(null);
  };
  

  // Close the dialog without buying
  const handleCancel = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  // Render product cards
  const renderCards = (items, isUnauthorized = false) =>
    items.map(item => (
      <Card key={item.id} sx={{ width: 200, m: 1, position: 'relative' }}>
        <CardMedia component="img" height="140" image={item.img} alt={item.name} />
        <CardContent>
          <Typography variant="subtitle1" align="center">{item.name}</Typography>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button
              variant="contained"
              color={isUnauthorized ? "error" : "primary"}
              onClick={() => openBuyDialog(item, isUnauthorized)}
            >
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Typography variant="h5" gutterBottom>Authorized Products</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCards(authorized)}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom color="error">Unauthorized Products</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCards(unauthorized, true)}
      </Box>

      {/* Dialog for confirming the purchase */}
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
            {/* Conditional buttons based on authorization */}
            {authorizedUser ? (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="textSecondary">
                You are an authorized person, so you can add this item to your cart.
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={handleConfirmBuy} 
                    color="primary" 
                    sx={{ mt: 2 }}
                    >
                    Add to Cart
                </Button>
            </Box>
            ) : (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="error">
                You are not authorized. Please register by filling out the form below.
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/register')} 
                    color="secondary" 
                    sx={{ mt: 2 }}
                    >
                    Fill Form
                </Button>

            </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="error">Cancel</Button>
        </DialogActions>
        </Dialog>

    </Box>
  );
};

export default Products;
