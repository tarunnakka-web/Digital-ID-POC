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
        <Container maxWidth="lg" sx={{ mt: "90px", height: "70vh" }}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, boxShadow: 4 }}>
                {/* Left Section: Main Image with Hover Zoom */}
                <Box sx={{ width: { xs: "100%", md: "40%" }, p: 3, borderRight: { md: "1px solid #eee" }, overflowY: "auto" }}>
                    <Box sx={{ position: "relative", mb: 2, borderRadius: 2, overflow: "hidden", cursor: "zoom-in" }}>
                        <Box
                            onClick={() => setZoomOpen(true)}
                            sx={{
                                width: "100%",
                                height: 400,
                                backgroundImage: `url(${mainImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: 2,
                                transition: "background-size 0.3s ease",
                                "&:hover": {
                                    backgroundSize: "200%",
                                },
                            }}
                            onMouseMove={(e) => {
                                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - left) / width) * 100;
                                const y = ((e.clientY - top) / height) * 100;
                                e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundPosition = "center";
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                    borderRadius: "50%",
                                    p: 1,
                                }}
                            >
                                <AddCircleOutline fontSize="small" />
                            </Box>
                        </Box>
                    </Box>

                    {/* Thumbnails */}
                    <Grid container spacing={1}>
                        {thumbnails &&
                            thumbnails.map((thumb, index) => (
                                <Grid item xs={3} key={index}>
                                    <Box
                                        onClick={() => handleThumbnailClick(thumb.url)}
                                        sx={{
                                            cursor: "pointer",
                                            border: selectedThumbnail === thumb.url ? "2px solid #1976D2" : "1px solid #ccc",
                                            borderRadius: 1,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={thumb.url}
                                            alt={`Thumb ${index}`}
                                            style={{ width: "100%", height: "60px", objectFit: "cover" }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                    </Grid>
                </Box>

                {/* Right Section: Product Details */}
                <Box sx={{ width: { xs: "100%", md: "60%" }, p: 3, overflowY: "auto" }}>
                    <Typography variant="h4" fontWeight={600}>{name}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>{description}</Typography>
                    <Typography variant="h5" color="primary" sx={{ mt: 2 }}>₹{price}/-</Typography>

                    {/* Seller Prices */}
                    {sellerPrice?.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">Prices from other sellers:</Typography>
                            {sellerPrice.map((s, i) => (
                                <Typography key={i} variant="body2" color="primary">{s.seller}: ₹{s.price}/-</Typography>
                            ))}
                        </Box>
                    )}

                    {/* <Typography variant="subtitle1" color={inStock ? "green" : "red"} sx={{ mt: 3 }}>
                        {inStock ? "In Stock" : "Out of Stock"}
                    </Typography> */}
                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{ min: 1 }}
                        sx={{ mt: 2, width: "100px" }}
                    />

                    {/* Features */}
                    {features?.length > 0 && (
                        <Box sx={{ mt: 3, maxHeight: "120px", overflowY: "auto" }}>
                            <Typography variant="subtitle1" fontWeight={500}>Features:</Typography>
                            <ul>
                                {features.map((f, i) => (
                                    <li key={i}><Typography variant="body2">{f}</Typography></li>
                                ))}
                            </ul>
                        </Box>
                    )}

                    {/* Reviews */}
                    {reviews?.length > 0 && (
                        <Box sx={{ mt: 3, maxHeight: "150px", overflowY: "auto" }}>
                            <Typography variant="subtitle1" fontWeight={500}>Reviews:</Typography>
                            {reviews.map((r, i) => (
                                <Box key={i} sx={{ mt: 1 }}>
                                    <Rating value={r.rating} readOnly size="small" />
                                    <Typography variant="body2">{r.comment}</Typography>
                                    <Typography variant="caption" color="text.secondary">- {r.author}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Wishlist & Cart Buttons */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 4, gap: 2 }}>
                        <IconButton onClick={handleWishlistToggle} sx={{ color: wishlist ? "red" : "gray" }}>
                            <FavoriteBorder />
                        </IconButton>
                        <Typography variant="body2">{wishlist ? "Added to Wishlist" : "Add to Wishlist"}</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        sx={{ mt: 2, borderRadius: 2, padding: "10px 24px" , backgroundColor:"#006A4D", mr:2 }}
                    >
                        Add to Cart
                    </Button>

                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button variant="outlined" color="#006A4D" sx={{ mt: 2 , color:"#006A4D"}}>
                            Back to Products
                        </Button>
                    </Link>
                </Box>
            </Card>

            {/* Fullscreen Zoom Modal */}
            <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="md">
                <DialogTitle>Zoomed Image</DialogTitle>
                <img
                    src={mainImage}
                    alt="Zoomed"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                    }}
                />
                <DialogActions>
                    <Button onClick={() => setZoomOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

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
                        bgcolor: "#006A4D",
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
                        color="#006A4D"
                        sx={{
                            borderRadius: "20px",
                            color:"#006A4D",
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
                        disabled={isNewUser && !dropDownValue}
                        sx={{
                            borderRadius: "20px",
                            backgroundColor:"#006A4D",
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
