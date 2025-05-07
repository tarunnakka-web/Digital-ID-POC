// Importing necessary dependencies
import React from 'react';
import { Container, Typography, Grid, Box, MenuItem, Select, TextField ,IconButton } from '@mui/material';
import ProductCards from '../ProductCards/ProductCards';
import SortIcon from '@mui/icons-material/Sort';
import data from "../data" ; 

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
      marginTop: "90px",
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
      fontSize: '24px',
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
        justifyContent:"center",
        gap: 1
      }}
    >
      <SortIcon />
      <Typography variant='p'>Sort by</Typography>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        sx={{ width: '160px', fontSize:"14px" }}
        size="small"
        
      >
        <MenuItem sx={{fontSize:"13px"}}  value="Price (High-Low)">Price (High-Low)</MenuItem>
        <MenuItem sx={{fontSize:"13px"}}  value="Price (Low-High)">Price (Low-High)</MenuItem>
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
// Exporting the HomePage component
export default HomePage;