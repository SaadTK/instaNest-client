import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://www.ahstatic.com/photos/b6u2_ho_00_p_1024x768.jpg",
    title: "Relax in Elegant Comfort",
    subtitle: "Experience unmatched luxury and hospitality.",
  },
  {
    id: 2,
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455738066.jpg?k=6366b50877bbfb67006c167def3a32b1c26e5d5e5a2c2e1a40352f3871809b34&o=&hp=1",
    title: "Breathtaking Views Await",
    subtitle: "Wake up to panoramic landscapes every morning.",
  },
  {
    id: 3,
    image: "https://www.hotellakeview.com/images/luxury-hotel-room.jpg",
    title: "Book Your Dream Stay",
    subtitle: "Gold-standard service for your peaceful getaway.",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full min-h-[80vh] rounded-none">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          id={`slide${idx}`}
          className="carousel-item relative w-full"
        >
          <div
            className="w-full bg-cover bg-center min-h-[80vh] flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-lg mt-4 mb-6 font-body text-background max-w-xl drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link to="/rooms">
                <button className="btn btn-primary text-white">
                  Explore Rooms
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${(idx - 1 + slides.length) % slides.length}`}
              className="btn btn-circle bg-secondary text-white hover:bg-primary"
            >
              ❮
            </a>
            <a
              href={`#slide${(idx + 1) % slides.length}`}
              className="btn btn-circle bg-secondary text-white hover:bg-primary"
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
