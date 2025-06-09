import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/ReviewList";
import BookNow from "../components/BookNow";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    // Fetch room details
    axios
      .get(`http://localhost:5005/api/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoadingRoom(false);
      })
      .catch((err) => {
        console.error("Failed to fetch room:", err);
        setLoadingRoom(false);
      });

    // Fetch reviews for this room
    axios
      .get(`http://localhost:5005/api/reviews/${id}`)
      .then((res) => {
        setReviews(res.data);
        setLoadingReviews(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoadingReviews(false);
      });
  }, [id]);

  const handleBookingSuccess = () => {
    setRoom((prev) => ({
      ...prev,
      available: false,
    }));
  };

  if (loadingRoom)
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        ⏳ Loading room details...
      </p>
    );

  if (!room)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-red-500">
        🚫 Room not found.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Room Title */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
        {room.name}
      </h2>

      {/* Room Images */}
      {room.images?.length > 0 ? (
        <div className="relative">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-2 left-2 flex gap-2">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`room-${idx}`}
                className="h-20 w-24 object-cover rounded-lg shadow-sm transition-transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow-md text-lg font-semibold text-gray-700">
          📷 No image available
        </div>
      )}

      {/* Room Description */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-sm">
        <p className="text-gray-700 text-lg">{room.description}</p>
        <p className="text-2xl font-bold text-primary mt-4">
          ${room.price} / night
        </p>
        <p className="text-lg mt-2">Capacity: {room.capacity}</p>
      </div>

      {/* Booking Section */}
      <div className="mt-6">
        <BookNow room={room} onBookingSuccess={handleBookingSuccess} />
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        {loadingReviews ? (
          <p className="text-center text-lg font-semibold">
            ⏳ Loading reviews...
          </p>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
