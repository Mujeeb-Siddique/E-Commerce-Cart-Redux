// src/Pages/CheckOut.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items || []);
  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.zip.trim()) e.zip = "Zip/Postal code is required";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setIsSubmitting(true);

      // fake API delay
      await new Promise((res) => setTimeout(res, 1000));

      dispatch(clearCart());
      navigate("/thankyou");
    }
  }

  if (!items.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/products")}
        >
          Go to products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left: Form */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            Checkout Details
          </Typography>

          <Box  component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
                  sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",  
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",  
              }
               }}
            
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
                  sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",  
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",  
              }
               }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
                  sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",   
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",   
              }
               }}
            />
            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.city}
              helperText={errors.city}
                  sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",   
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",   
              }
               }}
            />
            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.state}
              helperText={errors.state}
                sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",   
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",   
              }
               }}
            />
            <TextField
              label="Zip/Postal Code"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.zip}
              helperText={errors.zip}
              sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",   
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",   
              }
               }}
            />
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.address}
              helperText={errors.address}
                  sx={{
             "& .MuiInputBase-input": {
              color: "grey.500",  
              },
              "& .MuiInputLabel-root": {
              color: "grey.600",   
              }
               }}
            />

            
<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 3 }}>
  {/* Continue Shopping Button */}
  <Button
    variant="outlined"
    fullWidth
    onClick={() => !isSubmitting && navigate("/products")}
    sx={{
      color: isSubmitting ? "purple.400" : "purple.600",
      borderColor: isSubmitting ? "purple.400" : "purple.600",
      backgroundColor: isSubmitting ? "transparent" : "inherit",
      "&:hover": {
        borderColor: isSubmitting ? "purple.400" : "purple.800",
        backgroundColor: isSubmitting ? "transparent" : "purple.50",
      },
      pointerEvents: isSubmitting ? "none" : "auto", // disables click manually
    }}
  >
    Continue Shopping
  </Button>

  {/* Checkout Button */}
  <Button
    type="submit"
    variant="contained"
    fullWidth
    onClick={(e) => isSubmitting && e.preventDefault()} // prevent click manually
    sx={{
      bgcolor: isSubmitting ? "purple.500" : "purple.600",
      color: "white",
      "&:hover": {
        bgcolor: isSubmitting ? "purple.500" : "purple.800",
      },
    }}
  >
    {isSubmitting ? "Placing order..." : `Checkout • ${formatUSD(total)}`}
  </Button>
</Box>

          </Box>
        </Grid>

        {/* Right: Order Summary */}
        <Grid item xs={12} md={6}>
         <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
          <Card
            sx={{
              bgcolor: "grey.900",
              color: "white",
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              {items.map((it) => (
                <Box
                  key={it.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  {/* Product photo */}
                  <Box
                    component="img"
                    src={it.image || "https://via.placeholder.com/50"}
                    alt={it.title}
                    sx={{ width: 50, height: 50, borderRadius: 1, mr: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{it.title}</Typography>
                    <Typography variant="body2" color="grey.400">
                      Qty: {it.quantity} × {formatUSD(it.price)}
                    </Typography>
                  </Box>
                  <Typography>{formatUSD(it.price * it.quantity)}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2, borderColor: "grey.700" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                <Typography>Total</Typography>
                <Typography>{formatUSD(total)}</Typography>
              </Box>
            </CardContent>
          </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOut;
