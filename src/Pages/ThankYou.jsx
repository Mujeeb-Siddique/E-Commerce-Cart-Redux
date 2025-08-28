// src/Pages/ThankYou.jsx
import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh", // vertically centered
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          p: 5,
          maxWidth: 600,
          mx: "auto",
          textAlign: "center",
          bgcolor: "grey.900",
          color: "white",
          boxShadow: 6,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          🎉 Thank You for Your Order!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: "grey.300" }}>
          Your order has been placed successfully. We’ll send you a confirmation email soon.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            bgcolor: "purple.600",
            "&:hover": { bgcolor: "purple.800" },
          }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Box>
  );
};

export default ThankYou;
