import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapLocation = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg my-8">
      <h2 className="text-3xl font-bold text-center mb-4">📍 Find Us On Map</h2>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={13}
        className="rounded-lg overflow-hidden shadow-md"
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.8103, 90.4125]}>
          <Popup className="text-lg font-semibold text-gray-800">
            📍 Our Hotel Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLocation;
