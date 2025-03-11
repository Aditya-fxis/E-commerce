import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/contact/", formData);
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      {/* Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918790405!2d72.41493012913726!3d23.020158084541748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1741684423678!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section - Contact Info */}
        <div>
          <p className="text-red-600 text-sm mb-4 font-semibold uppercase tracking-[2px]">
            Information
          </p>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-6">
            As you might expect of a company that began as a high-end interiors
            contractor, we pay strict attention.
          </p>
          <div className="mb-6">
            <h3 className="font-bold text-lg">Gujarat</h3>
            <p className="text-gray-700">
              195 E Parker Square Dr, Parker, CO 801
            </p>
            <p className="text-gray-700">+91 18231 40958</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">India</h3>
            <p className="text-gray-700">
              109 Avenue Léon, 63 Clermont-Ferrand
            </p>
            <p className="text-gray-700">+91 34542 39893</p>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="text-gray-400">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-3 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-3 outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 p-3 outline-none h-32 mb-6"
            ></textarea>
            <button
              type="submit"
              className="flex items-center uppercase tracking-[3px] bg-black text-white p-4 px-10 text-sm font-semibold cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Success/Error Messages */}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
