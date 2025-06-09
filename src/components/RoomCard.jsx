// import React from "react";
// import { useNavigate } from "react-router-dom";

// const RoomCard = ({ room }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/rooms/${room._id}`)}
//       className="card bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer transition duration-300"
//     >
//       <figure>
//         <img src={room.image} alt={room.name} className="h-60 w-full object-cover" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{room.name}</h2>
//         <p>{room.description?.slice(0, 80)}...</p>
//         <p className="text-lg font-bold">${room.price} / night</p>
//       </div>
//     </div>
//   );
// };

// export default RoomCard;
import React from "react";

const RoomCard = () => {
  return <div>RoomCard</div>;
};

export default RoomCard;
