import { createSlice } from '@reduxjs/toolkit';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  return user?.id || "guest";
};

const updateLocalStorage = (userId, wishlistItems) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlistItems));
};

const userId = getUserId();
const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

const initialState = {
  wishlistItems: savedWishlist,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const userId = getUserId();
      const exists = state.wishlistItems.find(item => item.id === action.payload.id);
      if (!exists) {
        state.wishlistItems.push(action.payload);
        updateLocalStorage(userId, state.wishlistItems);
      }
    },

    removeFromWishlist: (state, action) => {
      const userId = getUserId();
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
      updateLocalStorage(userId, state.wishlistItems);
    },

    clearWishlist: (state) => {
      const userId = getUserId();
      state.wishlistItems = [];
      updateLocalStorage(userId, []);
    },

    loadWishlistFromStorage: (state, action) => {
      const userId = action.payload;
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
      state.wishlistItems = savedWishlist;
    }
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadWishlistFromStorage
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
