import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPosition({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  return (
    <GoogleMap
      center={position || { lat: 0, lng: 0 }}
      zoom={8}
      onClick={handleMapClick}
    >
      {position && <Marker position={position} />}
    </GoogleMap>
  );
};