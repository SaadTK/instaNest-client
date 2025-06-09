import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    title: "Relax in Elegant Comfort",
    subtitle: "Experience unmatched luxury and hospitality.",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    title: "Breathtaking Views Await",
    subtitle: "Wake up to panoramic landscapes every morning.",
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    title: "Book Your Dream Stay",
    subtitle: "Gold-standard service for your peaceful getaway.",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full min-h-[80vh] rounded-none relative">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          id={`slide${idx}`}
          className="carousel-item relative w-full"
        >
          <div
            className="w-full bg-cover bg-center min-h-[80vh] flex items-center justify-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center text-white p-6">
              <h2 className="text-5xl md:text-7xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg mt-4 mb-6 max-w-xl mx-auto drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link to="/rooms">
                <button className="btn btn-primary text-white px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg">
                  Explore Rooms
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${(idx - 1 + slides.length) % slides.length}`}
              className="btn btn-circle bg-white text-black hover:bg-gray-300 shadow-md"
            >
              ❮
            </a>
            <a
              href={`#slide${(idx + 1) % slides.length}`}
              className="btn btn-circle bg-white text-black hover:bg-gray-300 shadow-md"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
