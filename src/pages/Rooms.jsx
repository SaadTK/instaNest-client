import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import RoomCard from "../components/RoomCard";
// import { format } from "date-fns";
import { format } from "date-fns";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    capacity: "",
  });

  const fetchRooms = () => {
    const params = {};
    if (filter.minPrice) params.minPrice = filter.minPrice;
    if (filter.maxPrice) params.maxPrice = filter.maxPrice;
    if (filter.capacity) params.capacity = filter.capacity;

    axios
      .get("/api/rooms", {
        params,
        withCredentials: true, // <== Add this to send cookies
      })
      .then((res) => setRooms(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

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
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="input input-bordered"
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            className="input input-bordered"
            onChange={(e) => setFilter({ ...filter, capacity: e.target.value })}
          />
          <button className="btn btn-primary" onClick={fetchRooms}>
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
