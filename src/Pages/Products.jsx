import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Store/productSlice";
import { addItem } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Products = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  const handleAddToCart = (product) => {
    dispatch(addItem(product))
    setSnackbarOpen(true)
  }
  const handleSnackbarClose = (event, reason) => {
  if (reason === "clickaway") return;
  setSnackbarOpen(false);
};

if (status === "loading") {
  return (
    <>
    <Box sx={{ p: 4}}>
     <Typography variant="h4" gutterBottom fontWeight="bold">
        Products
      </Typography>
      </Box>
    <div className="container py-5">
          <div className="row justify-content-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={idx}>
                <div
                  className="card"
                  aria-hidden="true"
                  style={{ background: "#1e1e1e", color: "white", borderRadius: "0.75rem" }}
                >
                  <div style={{ height: 250, background: "#212121", borderRadius: "0.5rem" }}></div>
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div></div> */}
         <div className="container py-5">
          <div className="row justify-content-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={idx}>
                <div
                  className="card"
                  aria-hidden="true"
                  style={{ background: "#1e1e1e", color: "white", borderRadius: "0.75rem" }}
                >
                  <div style={{ height: 250, background: "#212121", borderRadius: "0.5rem" }}></div>
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
  );
}
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ p: 4, bgcolor: "#242424", minHeight: "100vh", color: "white" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Products
      </Typography>
     <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0px 6px 18px rgba(0,0,0,0.6)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 250,
                    objectFit: "contain",
                    p: 2,
                    bgcolor: "#212121",
                    borderRadius: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        flex: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        flex: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
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

export default Products;
