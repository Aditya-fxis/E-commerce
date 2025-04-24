import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: !!localStorage.getItem("access_token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.user = action.payload || null;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_profile");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
