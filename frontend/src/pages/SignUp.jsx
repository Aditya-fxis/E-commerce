import axios from "axios";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    profile_picture: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      email: formData.email,
      password: formData.password,
      profile_picture: formData.profile_picture, 
    };
  
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      toast.success("Signup successful!");
  
      setTimeout(() => navigate("/login"), 1000);
  
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
        profile_picture: "",
      });
    } catch (err) {
      const errorMsg =
        err?.response?.data?.detail ||
        JSON.stringify(err?.response?.data) ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
      console.error("Signup error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "e-commerce_profile");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dt2uz10hy/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setFormData((prev) => ({ ...prev, profile_picture: result.secure_url }));
      toast.success("Profile image uploaded!");
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-2">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-sm shadow -mt-12">
        <h1 className="text-xl font-semibold mb-5 text-center uppercase text-gray-800">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="text-sm text-gray-700 space-y-3"
        >
          {["first_name", "last_name", "phone_number", "email"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">
                {field.replace("_", " ")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black/10"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 capitalize">
              Upload Profile Image
            </label>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-block bg-gray-100 text-gray-800 px-3 py-2 border border-gray-300 rounded hover:bg-gray-200 transition text-sm">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </label>

              {formData.profile_picture && (
                <img
                  src={formData.profile_picture}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full border"
                />
              )}
            </div>
          </div>

          {["password", "confirm_password"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">
                {field.replace("_", " ")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name={field}
                  value={formData[field]}
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
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center">
            Already a user?{" "}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
