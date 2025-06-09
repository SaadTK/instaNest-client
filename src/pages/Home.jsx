import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import RoomCard from "../components/RoomCard";
import Testimonials from "../components/Testimonials";
import MapLocation from "../components/MapLocation";
import SpecialOfferModal from "../components/SpecialOfferModal";
import axios from "axios";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [showOffer, setShowOffer] = useState(true);

  // Replace this with your actual authentication state logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check login status on mount (you can adjust this)
    // For example, check localStorage or call an auth API
    const token = localStorage.getItem("token"); // or check cookie or context
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setRooms(data.slice(0, 6));
        } else {
          console.warn("Rooms API did not return an array:", data);
          setRooms([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setRooms([]);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>InstaNest | Home</title>
        <meta name="description" content="Book cozy rooms & enjoy your stay." />
      </Helmet>
      <div className="space-y-12 pb-12">
        <Banner />
        <section className="px-4 max-w-6xl mx-auto space-y-4">
          <h2 className="text-3xl font-semibold text-center">Featured Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </section>

        {isLoggedIn ? (
          rooms.length > 0 ? (
            <Testimonials roomId={rooms[0]._id} />
          ) : (
            <p className="text-center">No rooms available to show reviews.</p>
          )
        ) : (
          <p className="text-center text-red-500">
            Please log in to see guest reviews.
          </p>
        )}

        <MapLocation />
        {showOffer && (
          <SpecialOfferModal
            offer="Get 20% off all summer bookings!"
            onClose={() => setShowOffer(false)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
