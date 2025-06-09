import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/ReviewList";
import BookNow from "../components/BookNow";
import PageHead from "../components/PageHead";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
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
    <div className="max-w-6xl mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg">
      <PageHead
        title="Room Details"
        description="Book cozy rooms & enjoy your stay."
      />

      {/* Room Title */}
      <h2 className="text-5xl font-bold text-gray-900 text-center mb-6">
        {room.name}
      </h2>

      {/* Room Images */}
      {room.images?.length > 0 ? (
        <div className="relative">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-96 object-cover rounded-lg shadow-md transition-opacity duration-700"
          />
          <div className="absolute bottom-2 left-2 flex gap-2">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`room-${idx}`}
                className="h-24 w-32 object-cover rounded-lg shadow-sm transition-transform hover:scale-110"
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
        <p className="text-3xl font-bold text-primary mt-4">
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
