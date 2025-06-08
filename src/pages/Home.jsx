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

  useEffect(() => {
    axios
      .get("/api/rooms?minPrice=0&maxPrice=9999&capacity=1")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setRooms(data.slice(0, 6));
        } else {
          console.warn("Rooms API did not return an array:", data);
          setRooms([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setRooms([]); // fallback to empty array on error
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
        <Testimonials />
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
