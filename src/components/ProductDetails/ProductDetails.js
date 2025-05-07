
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Rating,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, FavoriteBorder } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext"; // Access user context for user data and authentication

const ProductDetail = () => {
    const navigate = useNavigate();
    const { loadUserData, user } = useUser(); // Load user data and user info
    const { addToCart } = useCart(); // Get addToCart from context
    const [open, setOpen] = useState(false); // Dialog open state
    const [isNewUser, setIsNewUser] = useState(null); // State for new user check
    const [dropDownValue, setDropDownValue] = useState(""); // State for dropdown selection
    const { state } = useLocation();
    const { item } = state || {};
    const { name, description, price, features, sellerPrice, reviews, thumbnails, criteria } = item;

    const [quantity, setQuantity] = useState(1);
    const [inStock, setInStock] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [mainImage, setMainImage] = useState("");
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [zoomOpen, setZoomOpen] = useState(false); // For full image modal

    useEffect(() => {
        if (item) {
            setInStock(item.availability === "In Stock");
            setMainImage(item.url);
            setSelectedThumbnail(item.url);
        }
    }, [item]);

    const handleQuantityChange = (event) => {
        let newQuantity = parseInt(event.target.value, 10);
        if (newQuantity < 1) newQuantity = 1;  // Ensuring min value is 1
        setQuantity(newQuantity);
      };
    

   
    const handleWishlistToggle = () => {
        setWishlist((prev) => !prev);
    };

    const handleAddToCart = () => {
        if (criteria === "authorized") {
            addToCart(item); // Add item directly if user is authorized
            alert(`${name} is added to cart successfully`);
        } else {
            // If not authorized, show dialog for ID verification
            setOpen(true);
            setIsNewUser(null);
            setDropDownValue(""); // Reset dropdown value
        }
    };

    const handleDropdownChange = (event) => {
        setDropDownValue(event.target.value);
    };

    const handleOpen = () => {
        if (criteria === "authorized") {
            addToCart(item, quantity); // Add quantity to cart
            alert(`${name} with quantity ${quantity} is added to cart successfully`);
        } else {
            setOpen(true);
            setIsNewUser(null);
            setDropDownValue(""); // Reset dropdown value
        }
    };

    const handleClose = () => {
        setOpen(false);
        setIsNewUser(null);
        setDropDownValue(""); // Reset dropdown value
    };

    // Navigate to verification page
    const handleProceed = () => {
        loadUserData();
        navigate("/selectID", { state: { item } });
    };

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
        setSelectedThumbnail(imageUrl);
    };

    if (!item) {
        return <Typography variant="h6">Product not found!</Typography>;
    }

  return (
    <Container sx={{ paddingTop: "40px", height: '80vh', display: 'flex', flexDirection: 'column'}}>
      <Grid container spacing={3} sx={{ height: '100%', padding:"20px",  display:"flex", justifyContent:'center', boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center",  height: '50%' }}>
          <Box
            component="img"
            src={url}
            alt={name}
            sx={{
              width: "170%",
              height: "170%",
              objectFit: "cover", // Make sure image covers the space
              borderRadius: "8px",
            }}
          />
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>{name}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2, textAlign: "center" }}>{caption}</Typography>
          <Typography variant="h6" color="text.primary" sx={{ marginBottom: 2, textAlign: "center" }}>₹{price}/-</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3, textAlign: "center" }}>Availability: In Stock</Typography>


          {/* Button to add to cart or proceed */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#1976D2",
                padding: "12px 24px",
                borderRadius: "20px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

    
    {/* Dialog for Restricted Products */}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 4,
                p: 2,
                bgcolor: "#fefefe",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DialogTitle
              marginBottom={4}
              sx={{
                bgcolor: "#1976D2",
                color: "#fff",
                textAlign: "center",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                pb: 2,
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography
                  variant="h6"
                  fontWeight={200}
                  sx={{ color: "#e0e0e0", mt: 1 }}
                >
                  ID is required to purchase restricted items.
                </Typography>
              </Box>
            </DialogTitle>
    
            <DialogActions
              sx={{
                px: 3,
                pb: 2,
                pt: 1,
                justifyContent: "space-between",
                borderTop: "1px solid #eee",
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Cancel Button */}
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: "20px",
                  padding: "10px 24px",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Cancel
              </Button>
    
              {/* Proceed Button */}
              <Button
                onClick={handleProceed}
                variant="contained"
                color="primary"
                disabled={isNewUser && !dropdownValue}
                sx={{
                  borderRadius: "20px",
                  padding: "10px 24px",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Look Up IDP
              </Button>
            </DialogActions>
          </Dialog>
    </Container>
  );
};

export default ProductDetail;
