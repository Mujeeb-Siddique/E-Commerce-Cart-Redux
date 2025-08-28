/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  clearCart,
} from "../Store/cartSlice";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  if (items.length === 0)
    return (
      <Box sx={{ p: 4, my:25 , textAlign: "center", color: "#bbb" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
            color="primary"
            sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: "bold", textTransform: "none" }}
          onClick={() => navigate("/products")}
        >
          Shop Now
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "#242424",
          color: "white",
          position: "relative",
        }}
      >
        {/* Sticky header: title + total + checkout */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            bgcolor: "#242424",
            pb: 2,
            mb: 3,
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Your Cart
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#90caf9" }}>
              Total: {formatUSD(total)}
            </Typography>
            <Button
              onClick={()=> {
                
                navigate('/checkout')
              }}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.25,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>

        {/* Items */}
        {items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#2e2e2e",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 150px 64px",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 100,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: 2,
                    bgcolor: "#1e1e1e",
                    p: 1,
                    justifySelf: "start",
                  }}
                />

                {/* Title + price (truncated) */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={item.title}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#90caf9" }}>
                    {formatUSD(item.price)}
                  </Typography>
                </Box>

                {/* Quantity controls (fixed column width) */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    disabled={item.quantity === 1}
                  >
                    <Remove />
                  </IconButton>

                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      if (qty >= 1) {
                        dispatch(updateQuantity({ id: item.id, quantity: qty }));
                      }
                    }}
                    size="small"
                    sx={{
                      width: 56,
                      input: {
                        textAlign: "center",
                        color: "white",
                        bgcolor: "#1e1e1e",
                        MozAppearance: "textfield",
                      },
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />

                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {/* Remove */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>

            {idx !== items.length - 1 && (
              <Divider sx={{ my: 2, borderColor: "#333" }} />
            )}
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  );
};

export default Cart;
