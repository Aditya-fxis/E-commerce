import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-black text-gray-300">
            <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
                {/* About Section */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
                    <p className="text-sm">
                        Discover the latest fashion trends with us. Shop from our curated selection of clothing, 
                        footwear, and accessories tailored for every occasion.
                    </p>
                    <div className="mt-4 flex gap-2 text-xl">
                        <FaCcVisa className="text-blue-500" />
                        <FaCcMastercard className="text-red-600" />
                        <FaCcPaypal className="text-blue-400" />
                    </div>
                </div>

                {/* Popular Categories */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Popular Categories</h2>
                    <ul className="space-y-3">
                        {["Men's Fashion", "Women's Fashion", "Kids' Wear", "Footwear", "Accessories"].map((item, index) => (
                            <li key={index} className="text-sm hover:text-white cursor-pointer transition-colors">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Customer Support</h2>
                    <ul className="space-y-3">
                        {["Help Center", "FAQs", "Returns & Refunds", "Shipping Policy", "Contact Us"].map((item, index) => (
                            <li key={index} className="text-sm hover:text-white cursor-pointer transition-colors">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connect with Us */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaFacebookF className="text-blue-500 text-lg" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaInstagram className="text-pink-500 text-lg" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaTwitter className="text-blue-400 text-lg" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaPinterest className="text-red-600 text-lg" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Bottom Footer */}
            <div className="bg-black border-t border-gray-600 py-4 text-center">
                <p className="text-sm text-gray-400">© {currentYear} Your Brand Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
