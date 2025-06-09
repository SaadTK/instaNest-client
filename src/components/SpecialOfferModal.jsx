import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SpecialOfferModal = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!shown) {
      Swal.fire({
        title: "🔥 Special Offer!",
        text: "Book now and get 20% off your first stay!",
        imageUrl: "/assets/promo.jpg",
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: "Book Now",
      });
      setShown(true);
    }
  }, [shown]);

  return null;
};

export default SpecialOfferModal;
