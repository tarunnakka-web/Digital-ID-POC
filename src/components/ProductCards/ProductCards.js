import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
} from "@mui/material";


// Component to render individual product card
const ProductCards = ({ item }) => {
  const navigate = useNavigate();
  // Destructure product info
  const { name, url, price} = item || {};


  const handleOpen = () => {
    navigate("/product-detail", { state: { item } }); // Passing the clicked product item to the detail page
  }


  return (
    <Card
    sx={{
      width:"240px" ,
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
      cursor:"pointer",
      // marginRight: "6px",
    }}
    >
      {/* Product Image */}
      <img
        src={url}
        alt={name || "Product"}
        style={{
          width: "210px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "5px",
          marginBottom: "20px",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Product Name */}
      <Typography variant="h6"> {name || "Default Name"}  </Typography>

      {/* Product Price */}
      <Typography  variant="h5" fontWeight={"bold"} > ₹{price}/- </Typography>
       
      {/* View Details Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          backgroundColor:"#006A4D" , 
          borderRadius: "20px",
          padding: "10px 24px",
          textTransform: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCards;