import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import Testimonials from "../components/Testimonials";
import MapLocation from "../components/MapLocation";
import SpecialOfferModal from "../components/SpecialOfferModal";
import axios from "axios";

const Home = () => {
  const [rooms, setRooms] = useState([]); // initialize as array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms"); // adjust this to your backend route
        setRooms(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setRooms([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="space-y-6">
      <section
        className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb)",
        }}
      >
        <div className="bg-black/50 p-10 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to InstaNest
          </h1>
          <p className="mt-4 text-lg">Your cozy nest for every journey</p>
        </div>
      </section>

      <section className="px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Top Featured Rooms</h2>
        {loading ? (
          <p>Loading rooms...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id || room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      <section className="px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
        <Testimonials />
      </section>

      <section className="px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Find Us on the Map</h2>
        <MapLocation />
      </section>

      <SpecialOfferModal />
    </div>
  );
};

export default Home;
