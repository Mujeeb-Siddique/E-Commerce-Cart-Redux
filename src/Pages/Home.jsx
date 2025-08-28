import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Store/productSlice";
import { addItem } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  if(status === 'failed') return <p>Failed to load item</p>

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#242424", color: "white", p: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h2" gutterBottom fontWeight="bold">
          Welcome to Our Store
        </Typography>
        <Typography variant="h6" color="gray" gutterBottom>
          Discover the best products at unbeatable prices.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: "bold", textTransform: "none" }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: "bold", textTransform: "none" }}
            onClick={() => navigate("/cart")}
          >
            View Cart
          </Button>
        </Box>
      </Box>

      {/* Featured Products */}
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        Featured Products
      </Typography>

      {status === "loading" ? (
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
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {products.slice(13, 17).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }} 
              >
                <Card
                  sx={{
                    bgcolor: "#1e1e1e",
                    color: "white",
                    borderRadius: 3,
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
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
                      {product.title.slice(0,28)}...
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
                       {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 3, textTransform: "none", flex: 1 }}
                        onClick={() => dispatch(addItem(product))}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ borderRadius: 3, textTransform: "none", flex: 1 }}
                        onClick={() => navigate(`/products/${product.id}`)}
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
      )}
    </Box>
  );
};

export default Home;
