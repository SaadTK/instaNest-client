import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import Swiper modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Failed to fetch room:", err));
  }, [id]);

  if (!room)
    return <div className="text-center mt-10">Loading room details...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{room.name}</h1>

      {/* Image Gallery */}
      <div className="mb-6">
        <Swiper
          style={{ "--swiper-navigation-color": "#fff" }}
          modules={[Navigation, Thumbs, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-lg overflow-hidden"
        >
          {room.images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Room image ${idx + 1}`}
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Images */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          slidesPerView={Math.min(room.images.length, 5)}
          watchSlidesProgress
          className="mt-4"
          spaceBetween={10}
        >
          {room.images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-20 w-full object-cover rounded-md border cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Room Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 mb-4">{room.description}</p>
          <p className="text-lg font-semibold text-primary">
            ${room.price} / night
          </p>
          <p className="text-sm text-gray-600">Capacity: {room.capacity}</p>
          <p className="text-sm text-gray-600">Location: {room.location}</p>
          <div className="mt-2">
            <span className="badge badge-info text-white p-3">
              ⭐ {room.rating}
            </span>
          </div>

          {room.amenities?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {room.amenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
          <p className="mb-4">
            Book now to reserve your stay at this location.
          </p>
          <button className="btn btn-primary w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
