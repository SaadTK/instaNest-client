import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [view, setView] = useState("card");
  const [priceRange, setPriceRange] = useState(500);

  useEffect(() => {
    axios.get(`/api/rooms?price=${priceRange}`).then((res) => setRooms(res.data));
  }, [priceRange]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <button onClick={() => setView(view === "card" ? "table" : "card")}>Toggle View</button>
      </div>
      {view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td><img src={room.image} alt={room.name} className="h-20" /></td>
                <td>{room.name}</td>
                <td>${room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Rooms;
