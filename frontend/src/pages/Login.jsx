import axios from 'axios';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "../redux/authSlice";
import { loadCartFromStorage } from '../redux/cartSlice';
import { loadWishlistFromStorage } from '../redux/wishlistSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { tokens } = res.data;
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // Fetch and save profile data
      const profileRes = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      const user = profileRes.data;
      localStorage.setItem("user_profile", JSON.stringify(user));

      dispatch(loginSuccess(user));

      dispatch(loadCartFromStorage(user.id));
      dispatch(loadWishlistFromStorage(user.id));

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);

      setFormData({ email: '', password: '' });

    } catch (err) {
      const errorMsg = err?.response?.data?.detail || "Invalid credentials.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-2">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-sm shadow -mt-12">
        <h1 className="text-xl font-semibold mb-5 text-center uppercase text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="text-sm text-gray-700 space-y-3">
          <div>
            <label className="block mb-1 capitalize">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="block mb-1 capitalize">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black/10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don’t have an account?{" "}
            <Link className="text-blue-500" to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
