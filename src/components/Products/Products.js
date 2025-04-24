import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const Products = () => {
  const authorized = [
    { id: 1, name: 'Smartphone', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
    { id: 2, name: 'Headphones', img: 'https://images.unsplash.com/photo-1511376777868-611b54f68947' },
    { id: 3, name: 'Laptop', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
    { id: 4, name: 'Smartwatch', img: 'https://images.unsplash.com/photo-1549921296-3a40b4f6b6bb' }
  ];

  const unauthorized = [
    { id: 5, name: 'Gun', img: 'https://images.unsplash.com/photo-1586216584763-4aa8f1b4f0c4' },
    { id: 6, name: 'Drugs', img: 'https://images.unsplash.com/photo-1588776814546-ec15a7b961a1' },
    { id: 7, name: 'Knife', img: 'https://images.unsplash.com/photo-1578656538603-76b539ae3bb6' },
    { id: 8, name: 'Explosives', img: 'https://images.unsplash.com/photo-1611341702801-fd9f8dcb0ad3' }
  ];

  const renderCards = (items, isUnauthorized = false) =>
    items.map(item => (
      <Card key={item.id} sx={{ width: 200, m: 1, filter: isUnauthorized ? 'grayscale(100%) blur(1px)' : 'none' }}>
        <CardMedia component="img" height="140" image={item.img} alt={item.name} />
        <CardContent>
          <Typography variant="subtitle1" align="center">{item.name}</Typography>
        </CardContent>
      </Card>
    ));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Authorized Products</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCards(authorized)}
      </Box>

      <Typography variant="h5" gutterBottom mt={4}>Unauthorized Products</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCards(unauthorized, true)}
      </Box>
    </Box>
  );
};

export default Products;
