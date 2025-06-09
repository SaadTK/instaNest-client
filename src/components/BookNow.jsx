import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import BookNowModal from "./BookNowModal";

const BookNow = ({ room, onBookingSuccess }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!user) return navigate("/login");
    setLoading(true);
    setTimeout(() => {
      setModalOpen(true);
      setLoading(false);
    }, 1000); // Simulating a short delay
  };

  return (
    <div className="mt-6 text-center">
      <button
        className={`btn px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        }`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Processing..." : "Book Now"}
      </button>

      {modalOpen && (
        <BookNowModal
          room={room}
          onClose={() => setModalOpen(false)}
          onBookingSuccess={onBookingSuccess}
        />
      )}
    </div>
  );
};

export default BookNow;
