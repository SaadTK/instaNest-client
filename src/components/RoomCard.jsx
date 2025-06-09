import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = room.images || [];

  // Auto-change image every 3 seconds with fade effect
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="card cursor-pointer border border-gray-300 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden bg-white"
      onClick={() => navigate(`/rooms/${room._id}`)}
    >
      {images.length > 0 ? (
        <div className="relative w-full h-56">
          <img
            src={images[currentImageIndex]}
            alt={room.name}
            className="w-full h-full object-cover rounded-t-lg transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-black/30 rounded-t-lg"></div>
        </div>
      ) : (
        <div className="w-full h-56 bg-gray-300 flex items-center justify-center rounded-t-lg">
          No image
        </div>
      )}

      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800">{room.name}</h3>
        <p className="text-lg font-semibold text-primary mt-2">
          ${room.price} / night
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
