import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = room.images || [];

  // Auto-change image every 3 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="card cursor-pointer border border-gray-300 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded overflow-hidden"
      onClick={() => navigate(`/rooms/${room._id}`)}
    >
      {images.length > 0 ? (
        <img
          src={images[currentImageIndex]}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          No image
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <p className="text-gray-700 font-bold">${room.price} / night</p>
      </div>
    </div>
  );
};

export default RoomCard;
