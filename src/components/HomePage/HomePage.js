// Importing necessary dependencies
import React from 'react'
import { Container, Typography, Grid } from '@mui/material'
import ProductCards from '../ProductCards/ProductCards'

// Sample product data used for rendering on the homepage
const data = [
  {"id": 1, "name": "Whiskey Bottle", "caption":"Crocodile leather sling bag", "price":1250, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589502/whisky_bottle_cxtmf7.webp"},
  {"id": 2, "name": "Pocket Knife", "caption":"Crocodile leather sling bag", "price":199, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589576/pocket_knife_ldmu7y.jpg"},
  {"id": 3, "name": "Fireworks", "caption":"Crocodile leather sling bag", "price":599, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589664/fireworks_poxtcm.webp"},
  {"id": 4, "name": "Adult Toy", "caption":"Crocodile leather sling bag", "price":799, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589779/adult_toys_as8s9q.jpg"},
  {"id": 5, "name": "White Shoes", "caption":"Crocodile leather sling bag", "price":1099, "criteria":"authorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559766/cld-sample-5.jpg"},
  {"id": 6, "name": "Analog watch", "caption":"Crocodile leather sling bag", "price":799, "criteria":"authorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559755/samples/ecommerce/analog-classic.jpg"},
  {"id": 7, "name": "Leather Bag", "caption":"Crocodile leather sling bag", "price":999, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589847/crocodile_leather_bags_mzpkvp.jpg"},
  {"id": 8, "name": "Cigarette Pack", "caption":"Crocodile leather sling bag", "price":399, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589902/cigaratte_drpste.webp"},
  {"id": 9, "name": "Prescription", "caption":"Crocodile leather sling bag", "price":499, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589973/priscription_pills_ba6eha.webp"},
  {"id": 10, "name": "Vaping Kit", "caption":"Crocodile leather sling bag", "price":599, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590076/bongs_su1maz.webp"},
  {"id": 11, "name": "Hazardous Chemical", "caption":"Crocodile leather sling bag", "criteria":"unauthorized", "price":1599, "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590322/Chemical_spill_z1nkai.webp"},
  {"id": 12, "name": "Ivory Artifact", "caption":"Crocodile leather sling bag", "price":699, "criteria":"unauthorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590496/organic_capsules_wvk6zh.webp"},
  {"id": 13, "name": "Alcohol making kits", "caption":"Crocodile leather sling bag", "criteria":"unauthorized", "price":2999, "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590647/alcohol_making_kits_v93jkt.webp"},
  {"id": 14, "name": "Books", "caption":"Crocodile leather sling bag", "price":499, "criteria":"authorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591231/book_qt6xtm.webp"},
  {"id": 15, "name": "iPhone", "caption":"Crocodile leather sling bag", "price":87000, "criteria":"authorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591309/iphone_yngytm.webp"},
  {"id": 16, "name": "sports t-shirt", "caption":"Crocodile leather sling bag", "price":699, "criteria":"authorized", "url": "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591363/sports_tshirt_gf4qz6.jpg"}
]

// Functional component to display all products on the homepage
const HomePage = () => (
  <Container maxWidth="xlg" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "80px", paddingBottom: "50px" }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: "40px", textAlign: 'center', marginTop: "6px", fontSize: "20px" }}>
      All Products
    </Typography>
    {/* Grid layout for product display with responsiveness */}
    <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} >
          <ProductCards item={item} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Exporting HomePage component as default
export default HomePage;
