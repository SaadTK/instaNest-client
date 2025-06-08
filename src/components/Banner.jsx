import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/nQ8pt94/banner-hotel.jpg')",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-50"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover Your Perfect Stay
          </h1>
          <p className="py-4 text-lg">
            Book luxury rooms with ease. Comfort meets convenience.
          </p>
          <Link to="/rooms">
            <button className="btn btn-primary text-white">
              Explore Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
