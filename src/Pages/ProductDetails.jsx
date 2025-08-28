import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItem } from "../Store/cartSlice";

// MUI imports
import {
  Box,
  Typography,
  Button,
  Rating,
  Grid,
  Paper,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  if (!product) return <Typography variant="h6">Loading Product...</Typography>;

  // Handlers for Snackbar
  const handleAddToCart = () => {
    dispatch(addItem(product));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          p: 4,
          bgcolor: "#242424",
          color: "white",
        }}
      >
        <Grid container spacing={6} alignItems="center">
          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "contain",
                borderRadius: 3,
                background: "#212121",
                p: 3,
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {product.title}
            </Typography>

            <Chip
              label={product.category.toUpperCase()}
              color="secondary"
              sx={{ mb: 2 }}
            />

            <Rating
              name="product-rating"
              value={product.rating?.rate || 4}
              precision={0.5}
              readOnly
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" gutterBottom>
              {product.rating?.count} reviews
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, mb: 3 }}>
              {product.description}
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#90caf9" }}
            >
              ${product.price}
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                  flex: 1,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                onClick={handleAddToCart} // <-- Updated handler
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  flex: 1,
                  color: "#90caf9",
                  borderColor: "#90caf9",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(144,202,249,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
                onClick={() => navigate("/products")}
              >
                Go Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
