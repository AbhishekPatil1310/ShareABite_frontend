import { MapContainer, TileLayer, Marker, useMapEvents, useMap, LayersControl } from "react-leaflet";
import { useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const { BaseLayer } = LayersControl;

function LocationMarker({ onSelect, position }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
          params: { lat, lon: lng, format: "json", addressdetails: 1 },
        });
        const { city, state, postcode } = res.data.address || {};
        onSelect({
          lat,
          lng,
          city: city || "",
          state: state || "",
          postalCode: postcode || "",
          fullAddress: res.data.display_name || "Unknown Address",
        });
      } catch {
        onSelect({ lat, lng, fullAddress: "Unknown Address" });
      }
    },
  });
  return position ? <Marker position={position}></Marker> : null;
}

function FlyToLocation({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo([position.lat, position.lng], 15, { duration: 1.5 });
  }
  return null;
}

export default function MapPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [query, setQuery] = useState("");

  // Search for address
  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: query, format: "json", addressdetails: 1, limit: 1 },
      });

      if (res.data?.length > 0) {
        const { lat, lon, display_name, address } = res.data;
        const newPos = { lat: parseFloat(lat), lng: parseFloat(lon), fullAddress: display_name, ...address };
        setPosition(newPos);
        onLocationSelect(newPos);
      } else {
        alert("Address not found");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // Get current location
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { lat, lon: lng, format: "json", addressdetails: 1 },
          });
          const fullAddress = res.data.display_name || "Unknown Address";
          const newPos = { lat, lng, fullAddress, ...res.data.address };
          setPosition(newPos);
          onLocationSelect(newPos);
        } catch {
          onLocationSelect({ lat, lng, fullAddress: "Unknown Address" });
        }
      },
      (err) => {
        console.error(err);
        alert("Failed to fetch your location.");
      }
    );
  };

  return (
    <div className="space-y-4 w-full">
      {/* Search Bar + Current Location */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an address..."
          className="flex-1 border rounded-lg px-3 py-2 shadow text-sm sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 text-sm sm:text-base"
        >
          Search
        </button>
        <button
          onClick={handleCurrentLocation}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 text-sm sm:text-base"
        >
          Use My Location
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-64 sm:h-96 md:h-[500px] rounded-xl shadow overflow-hidden">
        <MapContainer
          center={position ? [position.lat, position.lng] : [19.076, 72.8777]}
          zoom={13}
          className="w-full h-full"
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Street Map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri & Earthstar Geographics"
              />
            </BaseLayer>
          </LayersControl>
          <LocationMarker
            onSelect={(latlng) => {
              setPosition(latlng);
              onLocationSelect(latlng);
            }}
            position={position}
          />
          <FlyToLocation position={position} />
        </MapContainer>
      </div>
    </div>
  );
}
