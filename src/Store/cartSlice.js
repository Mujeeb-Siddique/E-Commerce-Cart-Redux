import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],      
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem:(state, action) =>{
        const existItem = state.items.find(i => i.id === action.payload.id);
        if(existItem){
          existItem.quantity += 1;
        }else{
          state.items.push({...action.payload, quantity:1});
        }
        // state.items.push(action.payload)
      },
      removeItem:(state, action) =>{
        state.items = state.items.filter(item => item.id !== action.payload)
      },
      incrementQuantity:(state, action)=> {
        const item = state.items.find(i => i.id === action.payload);
        if(item){
          item.quantity +=1
        };
      },
      decrementQuantity:(state, action) =>{
        const item = state.items.find(i => i.id === action.payload);
        if(item){
          if(item.quantity > 1){
            item.quantity -= 1
          }else{
             state.items = state.items.filter(i => i.id !== action.payload)
          }
        }
      },
      updateQuantity:(state, action) => {
        const {id, quantity} = action.payload;
        const item = state.items.find((i)=> i.id === id )
        if(item){
          item.quantity = quantity;
        }
        
      },
      clearCart:(state)=> {
        state.items =[];
      },
    },
})

export const {addItem, removeItem,incrementQuantity,decrementQuantity,updateQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer
