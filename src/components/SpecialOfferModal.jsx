import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SpecialOfferModal = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!shown) {
      Swal.fire({
        title: "🔥 Special Offer!",
        text: "Book now and get 20% off your first stay!",
        imageUrl:
          "https://png.pngtree.com/png-clipart/20220424/original/pngtree-special-offer-20-discount-sale-promotion-tag-elements-png-image_7552633.png",
        imageWidth: 300,
        imageHeight: 200,
        confirmButtonText: "Book Now",
      });
      setShown(true);
    }
  }, [shown]);

  return null;
};

export default SpecialOfferModal;
