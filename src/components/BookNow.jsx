// components/BookNow.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import BookNowModal from "./BookNowModal";

const BookNow = ({ room, onBookingSuccess }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (!user) return navigate("/login");
    setModalOpen(true);
  };

  return (
    <div className="mt-6">
      <button className="btn btn-primary" onClick={handleClick}>
        Book Now
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
