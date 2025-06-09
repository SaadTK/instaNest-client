import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookNowModal from "../components/BookNowModal";
import ReviewList from "../components/ReviewList";
import { AuthContext } from "../contexts/AuthProvider";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingMode, setBookingMode] = useState(false);

  useEffect(() => {
    axios.get(`/api/rooms/${id}`).then((res) => setRoom(res.data));
    axios.get(`/api/rooms/${id}/reviews`).then((res) => setReviews(res.data));
  }, [id]);

  const handleBook = async () => {
    if (!user) return toast.error("Login required");
    const resp = await axios.post("/api/bookings", {
      room: id,
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 1,
      totalPrice: room.price,
    });
    toast.success("Booked!");
    setBookingMode(false);
  };

  if (!room) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{room.name} | InstaNest</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-80 rounded-lg object-cover"
        />
        <h2 className="text-3xl font-semibold">{room.name}</h2>
        <p className="text-lg">{room.description}</p>
        <p className="text-xl font-bold">${room.price}/night</p>
        <button
          className="btn btn-primary"
          onClick={() => setBookingMode(true)}
        >
          Book Now
        </button>
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <ReviewList reviews={reviews} />
        </section>
        {bookingMode && (
          <BookNowModal
            room={room}
            onConfirm={handleBook}
            onClose={() => setBookingMode(false)}
          />
        )}
      </div>
    </>
  );
};

export default RoomDetails;
