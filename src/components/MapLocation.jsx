import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapLocation = () => {
  return (
    <MapContainer center={[23.8103, 90.4125]} zoom={13} scrollWheelZoom={false} className="h-64 w-full rounded-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[23.8103, 90.4125]}>
        <Popup>InstaNest Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLocation;