import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <p className="text-sm text-gray-600">{room.description.slice(0, 60)}...</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">${room.price}/night</span>
          <Link
            to={`/rooms/${room._id}`}
            className="text-blue-500 hover:underline"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;