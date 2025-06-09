// pages/RoomDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/ReviewList";
import BookNow from "../components/BookNow";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Failed to fetch room:", err));
  }, [id]);

  const handleBookingSuccess = (bookedDate) => {
    setRoom((prev) => ({
      ...prev,
      available: false,
    }));
  };

  if (!room)
    return <p className="text-center mt-10">Loading room details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{room.name}</h2>

      {room.images?.length > 0 ? (
        <div className="flex flex-col gap-2">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-64 object-cover rounded mb-2"
          />
          <div className="flex gap-2 overflow-x-auto">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`room-${idx}`}
                className="h-20 w-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded mb-4">
          No image
        </div>
      )}

      <p className="mb-2 text-gray-700">{room.description}</p>
      <p className="text-lg font-semibold">${room.price} / night</p>
      <p>Capacity: {room.capacity}</p>

      <BookNow room={room} onBookingSuccess={handleBookingSuccess} />

      <ReviewList reviews={room.reviews || []} />
    </div>
  );
};

export default RoomDetails;
