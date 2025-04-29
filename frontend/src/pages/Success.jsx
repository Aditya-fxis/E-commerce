import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Success = () => {
  const [message, setMessage] = useState("Verifying payment...");
  const [orderDetails, setOrderDetails] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`http://localhost:8000/api/verify-payment/?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment successful! 🎉");
            setMessage("Payment successful! 🎉 Thank you for your order.");
            setOrderDetails(data.order);
            dispatch(clearCart());
          } else {
            toast.error("Payment not verified.");
            setMessage("Payment not verified.");
          }
        })
        .catch(() =>{ 
          toast.error("An error occurred during verification.");
          setMessage("An error occurred during verification.")});
        } else {
      toast.error("No session ID found.");
      setMessage("No session ID found.");
    }
  }, [location, dispatch]);

  return (
    <div className="p-10 text-center">
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-6">{message}</h1>

      {orderDetails.length > 0 && (
        <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Your Order:</h2>
          <ul className="text-left text-sm">
            {orderDetails.map((item, index) => (
              <li key={index} className="py-1 border-b border-gray-300">
                <img src={item.main_image} alt="" />{item.name} × {item.quantity} — ${item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Success;
