import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapPicker from "../components/MapPicker";
import { useSelector } from "react-redux";
import { addAddress, getAddresses } from "../api/userApi";
import GoBackButton from "../components/BackButton";

export default function AddressPage() {
  const [selected, setSelected] = useState(null); // from MapPicker
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullAddress: "",
    landmark: "",
    mobileNo: "",
    label: "Home",
  });

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  // Fetch saved addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return;
      try {
        const addresses = await getAddresses(userId); // already array
        setAddresses(Array.isArray(addresses) ? addresses : []);
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
        setAddresses([]);
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!selected) return alert("Please select a location on the map!");
    if (!form.mobileNo || !form.fullAddress)
      return alert("Please fill mobileNo number and full address!");

    const payload = {
      label: form.label,
      fullAddress: form.fullAddress,
      landmark: form.landmark,
      city: selected.city || "Unknown",
      state: selected.state || "Unknown",
      postalCode: selected.postalCode || "000000",
      mobileNo: form.mobileNo,
      lat: selected.lat,
      lng: selected.lng,
    };

    try {
      await addAddress(userId, payload);
      // refresh list after saving
      const addresses = await getAddresses(userId); // already array
      setAddresses(Array.isArray(addresses) ? addresses : []);
      // reset form
      setForm({ fullAddress: "", landmark: "", mobileNo: "", label: "Home" });
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-x-hidden">
      <GoBackButton />

      {/* Header */}
      <header className="p-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-10">
        <h1 className="text-lg sm:text-xl md:text-3xl font-extrabold text-gray-800 text-center">
          Pick or Search Address
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 h-64 sm:h-96 md:h-[500px] lg:h-full bg-white/50">
          <MapPicker onLocationSelect={setSelected} />
        </div>

        {/* Form + Saved Addresses */}
        <div className="flex flex-col gap-6">
          {/* Address Form */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/70 backdrop-blur-lg shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-4">
              Enter Details
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullAddress"
                value={form.fullAddress}
                onChange={handleChange}
                placeholder="Flat/House/Hotel name, Street"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Nearby Landmark (optional)"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
              <input
                type="tel"
                name="mobileNo"
                value={form.mobileNo}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
              <select
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleSave}
                className="mt-2 w-full bg-gradient-to-r from-pink-400 to-purple-500 
                  text-white px-6 py-3 rounded-xl font-semibold shadow-md 
                  hover:from-pink-500 hover:to-purple-600 transition-all text-sm sm:text-base"
              >
                Save Address
              </motion.button>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/70 backdrop-blur-lg shadow-md border border-gray-200 flex-1">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-4">
              Saved Addresses
            </h2>
            {addresses.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base">
                No saved addresses yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {addresses.map((a, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-3 sm:p-4 rounded-lg bg-white/60 backdrop-blur-md 
                      border border-gray-200 shadow-sm text-gray-700 text-sm sm:text-base"
                  >
                    <span className="font-bold text-purple-600">{a.label}</span>{" "}
                    – {a.fullAddress} {a.landmark && `, ${a.landmark}`}
                    <br />
                    <span className="text-gray-500">
                      {a.city}, {a.state} ({a.postalCode})
                    </span>
                    <br />
                    📞 {a.mobileNo}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
