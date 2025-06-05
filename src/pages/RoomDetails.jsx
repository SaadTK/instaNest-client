import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookNowModal from "../components/BookNowModal";
import ReviewList from "../components/ReviewList";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios.get(`/api/rooms/${id}`).then((res) => setRoom(res.data));
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={room.image} alt={room.name} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
      <p>{room.description}</p>
      <p className="mt-2 font-semibold">Price: ${room.price}</p>
      <BookNowModal room={room} />
      <ReviewList reviews={room.reviews || []} roomId={id} />
    </div>
  );
};

export default RoomDetails;
