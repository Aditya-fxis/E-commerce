import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  return user?.id || "guest";
};

const updateLocalStorage = (userId, cartItems, totalQuantity, totalPrice) => {
  if (!userId) return;
  localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  localStorage.setItem(`totalQuantity_${userId}`, JSON.stringify(totalQuantity));
  localStorage.setItem(`totalPrice_${userId}`, JSON.stringify(totalPrice));
};

const userId = getUserId();
const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
const savedTotalQuantity = JSON.parse(localStorage.getItem(`totalQuantity_${userId}`)) || 0;
const savedTotalPrice = JSON.parse(localStorage.getItem(`totalPrice_${userId}`)) || 0;

const initialState = {
  cartItems: savedCart,
  totalQuantity: savedTotalQuantity,
  totalPrice: savedTotalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const userId = getUserId();
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;

      updateLocalStorage(userId, state.cartItems, state.totalQuantity, state.totalPrice);
    },

    removeFromCart: (state, action) => {
      const userId = getUserId();
      const itemToRemove = state.cartItems.find(item => item.id === action.payload.id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);

        updateLocalStorage(userId, state.cartItems, state.totalQuantity, state.totalPrice);
      }
    },

    increaseQuantity: (state, action) => {
      const userId = getUserId();
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;

        updateLocalStorage(userId, state.cartItems, state.totalQuantity, state.totalPrice);
      }
    },

    decreaseQuantity: (state, action) => {
      const userId = getUserId();
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;

        updateLocalStorage(userId, state.cartItems, state.totalQuantity, state.totalPrice);
      }
    },

    clearCart: (state) => {
      const userId = getUserId();
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      updateLocalStorage(userId, [], 0, 0);
    },

    loadCartFromStorage: (state, action) => {
      const userId = action.payload;
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const savedQuantity = JSON.parse(localStorage.getItem(`totalQuantity_${userId}`)) || 0;
      const savedPrice = JSON.parse(localStorage.getItem(`totalPrice_${userId}`)) || 0;

      state.cartItems = savedCart;
      state.totalQuantity = savedQuantity;
      state.totalPrice = savedPrice;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  loadCartFromStorage
} = cartSlice.actions;

export default cartSlice.reducer;
