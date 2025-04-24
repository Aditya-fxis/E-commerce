import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    rating: 0,
    price: "",
    stock: 0,
    sale: false,
    main_image: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/category/");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/shop/${id}/`);
        setFormData({
          ...res.data,
          main_image: "",
          images: "",
        });
      } catch (err) {
        console.error("Failed to fetch product details", err?.response);
      }
    };

    fetchCategories();
    if (isEditMode) fetchProductDetails();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "images" && formData.images) {
        Array.from(formData.images).forEach((img) =>
          formDataToSend.append("uploaded_images", img)
        );
      } else if (key === "main_image" && formData.main_image) {
        formDataToSend.append("main_image", formData.main_image);
      } else if (key !== "images" && key !== "main_image") {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const url = isEditMode
        ? `http://localhost:8000/shop/${id}/`
        : "http://localhost:8000/shop/";
      const method = isEditMode ? "put" : "post";

      await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(`Product ${isEditMode ? "updated" : "added"} successfully!`);
      toast.success(success);
      if (!isEditMode) {
        setFormData({
          name: "",
          category: "",
          description: "",
          rating: 0,
          price: "",
          stock: 0,
          sale: false,
          main_image: "",
          images: "",
        });
      }
    } catch (err) {
      setError(
        `Failed to ${isEditMode ? "update" : "add"} product. Try again.`
      );
      toast.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8 ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg sm:text-xl font-bold uppercase mb-2 text-center sm:text-left">
          {isEditMode ? "Edit Product Details" : "Add Product Details"}
        </h1>

        <form onSubmit={handleSubmit} className="text-gray-700">
          <label className="text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full border border-gray-300 p-2 mb-1 text-sm"
          />

          <label className="text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border border-gray-300 p-2 text-sm"
          ></textarea>

          <label className="text-sm">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 mb-1 text-sm"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label className="text-sm">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
            className="w-full border border-gray-300 p-2 mb-1 text-sm"
          />

          <label className="text-sm">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border border-gray-300 p-2 mb-1 text-sm"
          />

          <label className="text-sm">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="w-full border border-gray-300 p-2 mb-3 text-sm"
          />

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              name="sale"
              checked={formData.sale}
              onChange={(e) =>
                setFormData({ ...formData, sale: e.target.checked })
              }
              className="text-sm"
            />
            <label className="ml-2 text-sm">On Sale</label>
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1">Main Image:</label>
            <input
              type="file"
              name="main_image"
              onChange={(e) =>
                setFormData({ ...formData, main_image: e.target.files[0] })
              }
              className="w-full border border-gray-300 p-1 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1">Additional Images:</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.files })
              }
              className="w-full border border-gray-300 p-1 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 px-6 w-full sm:w-auto text-xs font-semibold uppercase tracking-widest"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
