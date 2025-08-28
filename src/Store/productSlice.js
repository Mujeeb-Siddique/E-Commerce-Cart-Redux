import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk("products/fetchProducts", async()=> {
  const res = await fetch(API_URL);
  if(!res.ok){
    throw new Error("Failed to fetch products")
  }
  return res.json()
});

const initialState = {
    products: [],
    status: "idle", 
    error: null,
    };




const productSlice = createSlice({
    name: 'products',
    reducers:{},
    initialState,
    extraReducers:(builder)=> {
        builder
        .addCase(fetchProducts.pending, (state)=> {
            state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action)=> {
          state.status = "succeeded";
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
    },
});

export default productSlice.reducer;