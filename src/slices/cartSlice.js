import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalItems:localStorage.getItem("totalItems") 
  ? JSON.parse(localStorage.getItem("totalItems")) : 0,

  total:localStorage.getItem("total") 
  ? JSON.parse(localStorage.getItem("total")) : 0,

  cart:localStorage.getItem("cart") 
  ? JSON.parse(localStorage.getItem("cart")) :[],
};

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers:{
        addToCart: (state,action) =>{
          const course = action.payload
          const index = state.cart.findIndex((item) => item._id === course.id)
         
          if(index>=0){
            toast.error("cart is already in the cart");
            return
          }

          state.cart.push(course)
          state.totalItems++
          state.total += course.price

          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))

          toast.success("Course added to cart")

        },

        removeFromCart:(state,action)=>{

          const course = action.payload
          const index = state.cart.findIndex((item)=>item._id === course.id)
          if (index>=0) {
            state.totalItems--
            state.total -= state.cart[index].price
            state.cart.splice(index, 1)
          }

          
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))

          toast.success("Course removed from cart")
        },

        resetCart:(state, action) =>{
          state.cart = []
          state.totalItems = 0
          state.total = 0

          localStorage.removeItem("totalItems")
          localStorage.removeItem("cart")
          localStorage.removeItem("total")
        },

    }

        
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer