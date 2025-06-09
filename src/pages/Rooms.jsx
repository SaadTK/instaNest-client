import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const LoadingCard = () => (
  <div className="card bg-base-100 shadow-xl animate-pulse cursor-wait h-72">
    <div className="h-60 bg-gray-300"></div>
    <div className="card-body">
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

  // Fetch rooms on mount (initial load)
  useEffect(() => {
    fetchRooms();
  }, []);

  // Optionally: You can uncomment this to auto-fetch when filters change
  // React.useEffect(() => {
  //   fetchRooms();
  // }, [filter]);

  return (
    <>
      <Helmet>
        <title>InstaNest | Rooms</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h2 className="text-3xl font-semibold">Available Rooms</h2>

        <div className="flex flex-wrap gap-4 items-end mb-6">
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
          <button className="btn btn-primary" onClick={fetchRooms}>
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, idx) => <LoadingCard key={idx} />)
          ) : error ? (
            <p className="col-span-full text-center text-red-600">{error}</p>
          ) : Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <p className="col-span-full text-center">No rooms found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Rooms;
