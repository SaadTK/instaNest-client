import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import RoomCard from "../components/RoomCard";
import Testimonials from "../components/Testimonials";
import MapLocation from "../components/MapLocation";
import SpecialOfferModal from "../components/SpecialOfferModal";
import axios from "axios";
import PageHead from "../components/PageHead";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [showOffer, setShowOffer] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or check cookie or context
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/rooms")
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
      <PageHead
        title="InstaNest | Home"
        description="Book cozy rooms & enjoy your stay."
      />

      <div className="space-y-12 pb-12">
        <Banner />

        {/* Featured Rooms Section */}
        <section className="px-6 max-w-7xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            🌟 Featured Rooms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 py-12 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            💬 What Our Guests Say
          </h2>
          <Testimonials />
        </section>

        {/* Map Location */}
        <MapLocation />

        {/* Special Offer Modal */}
        {showOffer && (
          <SpecialOfferModal
            offer="🔥 Get 20% off all summer bookings!"
            onClose={() => setShowOffer(false)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
