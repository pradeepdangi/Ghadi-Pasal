import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('buy')
  ? JSON.parse(localStorage.getItem('buy'))
  : {  };

const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    buyyy: (state, action) => {
      // NOTE: we don't need user, rating, numReviews or reviews

      console.log('ok')
      
      // in the cart
      // const { user, rating, numReviews, reviews, ...item } = action.payload;

      // const existItem = state.cartItems.find((x) => x._id === item._id);

      // if (existItem) {
      //   state.cartItems = state.cartItems.map((x) =>
      //     x._id === existItem._id ? item : x
      //   );
      // } else {
      //   state.cartItems = [...state.cartItems, item];
      // }

      // localStorage.setItem('buy', JSON.stringify(state));
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  buyyy,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = buySlice.actions;

export default buySlice.reducer;
