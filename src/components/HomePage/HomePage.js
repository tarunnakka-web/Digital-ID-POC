// Importing necessary dependencies
import React from 'react';
import { Typography, Grid, Box, TextField, Select, MenuItem } from '@mui/material';
import ProductCards from '../ProductCards/ProductCards';
import SortIcon from '@mui/icons-material/Sort';

// Functional component to render homepage with all products
const data = [
  { id: 1, name: "Whiskey Bottle", caption: "Premium aged malt whiskey", price: 1250, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589502/whisky_bottle_cxtmf7.webp" },
  { id: 2, name: "Pocket Knife", caption: "Compact stainless steel utility knife", price: 199, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589576/pocket_knife_ldmu7y.jpg" },
  { id: 3, name: "Fireworks", caption: "Vibrant and colorful celebration fireworks", price: 599, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589664/fireworks_poxtcm.webp" },
  { id: 4, name: "Adult Toy", caption: "Discreet and personal wellness product", price: 799, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589779/adult_toys_as8s9q.jpg" },
  { id: 5, name: "White Shoes", caption: "Stylish all-white sneakers for everyday use", price: 1099, criteria: "authorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559766/cld-sample-5.jpg" },
  { id: 6, name: "Analog watch", caption: "Classic timepiece with leather strap", price: 799, criteria: "authorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745559755/samples/ecommerce/analog-classic.jpg" },
  { id: 7, name: "Leather Bag", caption: "Genuine leather office sling bag", price: 999, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589847/crocodile_leather_bags_mzpkvp.jpg" },
  { id: 8, name: "Cigarette Pack", caption: "Premium tobacco cigarette pack", price: 399, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589902/cigaratte_drpste.webp" },
  { id: 9, name: "Prescription", caption: "Bottle of regulated prescription pills", price: 499, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745589973/priscription_pills_ba6eha.webp" },
  { id: 10, name: "Vaping Kit", caption: "Rechargeable vape kit with flavored cartridges", price: 599, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590076/bongs_su1maz.webp" },
  { id: 11, name: "Hazardous Chemical", caption: "Highly reactive laboratory chemical", price: 1599, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590322/Chemical_spill_z1nkai.webp" },
  { id: 12, name: "Ivory Artifact", caption: "Traditional ornament made from ivory", price: 699, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590496/organic_capsules_wvk6zh.webp" },
  { id: 13, name: "Alcohol making kits", caption: "Home brewing equipment for alcohol", price: 2999, criteria: "unauthorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745590647/alcohol_making_kits_v93jkt.webp" },
  { id: 14, name: "Books", caption: "Bestselling fiction and non-fiction books", price: 499, criteria: "authorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591231/book_qt6xtm.webp" },
  { id: 15, name: "iPhone", caption: "Latest generation Apple smartphone", price: 87000, criteria: "authorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591309/iphone_yngytm.webp" },
  { id: 16, name: "sports t-shirt", caption: "Breathable activewear for workouts", price: 699, criteria: "authorized", url: "https://res.cloudinary.com/dpizvs16e/image/upload/v1745591363/sports_tshirt_gf4qz6.jpg" }
];


const HomePage = () => {
    const [search, setSearch]= React.useState('');
    const [sort, setSort] = React.useState("None");

  const filteredProducts = data.filter((item) => ( 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.caption.toLowerCase().includes(search.toLowerCase())
  ))

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "Price (Low-High)") return a.price - b.price;
    if (sort === "Price (High-Low)") return b.price - a.price;
    return 0;
  })

  return ( 
  <Box
    sx={{
      width: "100vw",
      overflowX: 'hidden',
      marginTop: "30px",
      paddingBottom: '50px',
    }}
  >
    {/* Page Title and search bar */}
    <Box
  sx={{
    width: '80%',
    margin: '0 auto 40px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    // boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    // backgroundColor: '#fafafa',
    flexWrap: 'wrap',
    gap: 2
  }}
>
  {/* Title */}
  <Typography
    variant="h5"
    sx={{
      fontWeight: 'bold',
      fontSize: '25px',
      flexGrow: 1,
      textAlign: { xs: 'center', sm: 'left' }
    }}
  >
    All Products
  </Typography>

  {/* Search + Sort */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}
  >
    {/* Search */}
    <TextField
      label="Search"
      size='small'
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ width: '250px', marginRight:"10px" }}
    />

    {/* Sort */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <SortIcon />
      <Typography>Sort by</Typography>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        sx={{ width: '160px' }}
        size='small'
      >
        <MenuItem value="None">None</MenuItem>
        <MenuItem value="Price (High-Low)">Price (High-Low)</MenuItem>
        <MenuItem value="Price (Low-High)">Price (Low-High)</MenuItem>
      </Select>
    </Box>
  </Box>
</Box>

    {/* Product Grid */}

    <Grid
      container
      spacing={2}
      sx={{
        width: '80%',
        margin: '0 auto',
        display:'flex',
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      {sortedProducts.map((item) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3} // 12/3 = 4 items per row
          key={item.id}
        >
          <ProductCards item={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
}
export default HomePage;
