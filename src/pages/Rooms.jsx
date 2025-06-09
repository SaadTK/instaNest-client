import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import PageHead from "../components/PageHead";

const LoadingCard = () => (
  <div className="card bg-white/90 backdrop-blur-lg shadow-lg animate-pulse cursor-wait h-72 rounded-lg">
    <div className="h-60 bg-gray-300 rounded-t-lg"></div>
    <div className="card-body p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    capacity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);

    const params = {};
    if (filter.minPrice) params.minPrice = filter.minPrice;
    if (filter.maxPrice) params.maxPrice = filter.maxPrice;
    if (filter.capacity) params.capacity = filter.capacity;

    try {
      const res = await axios.get("http://localhost:5005/api/rooms", {
        params,
        withCredentials: true,
      });
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <PageHead
        title="All Rooms"
        description="Book cozy rooms & enjoy your stay."
      />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          🏨 Available Rooms
        </h2>

        {/* Filter Section */}
        {/* <div className="flex flex-wrap gap-4 items-end justify-center mb-6">
          <input
            type="number"
            placeholder="Min Price"
            className="input input-bordered"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="input input-bordered"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            className="input input-bordered"
            value={filter.capacity}
            onChange={(e) => setFilter({ ...filter, capacity: e.target.value })}
          />
          <button
            className="btn btn-primary px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
            onClick={fetchRooms}
          >
            Filter
          </button>
        </div> */}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, idx) => <LoadingCard key={idx} />)
          ) : error ? (
            <p className="col-span-full text-center text-red-600 text-lg font-semibold">
              {error}
            </p>
          ) : Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <p className="col-span-full text-center text-lg font-semibold text-gray-600">
              No rooms found. Try adjusting your filters!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Rooms;
