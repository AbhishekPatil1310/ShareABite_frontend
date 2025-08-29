import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getMyAds, deleteAd, updateAd } from "../api/userApi";
import toast, { Toaster } from "react-hot-toast";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null); 
  const user = useSelector((s) => s.auth.user);

  // Reusable fetch function
  const fetchAds = useCallback(async () => {
    if (!user?._id) return;
    try {
      const data = await getMyAds(user._id);
      setAds(data);
    } catch (err) {
      console.error("Error fetching ads:", err);
      toast.error("Failed to load ads");
    }
  }, [user?._id]);

  // Fetch on mount
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await deleteAd(id);
      toast.success("Ad deleted successfully");
      fetchAds(); // refresh ads
    } catch (err) {
      console.error("Error deleting ad:", err);
      toast.error("Failed to delete ad");
    }
  };

  // Open modal for update
  const handleUpdate = (ad) => {
    setEditingAd({ ...ad });
  };

  // Save updated ad
  const handleSave = async () => {
    try {
      await updateAd(editingAd._id, editingAd);
      toast.success("Ad updated successfully");
      setEditingAd(null); 
      fetchAds(); // refresh ads
    } catch (err) {
      console.error("Error updating ad:", err);
      toast.error("Failed to update ad");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-sm">
        My Ads
      </h1>

      {ads.length === 0 ? (
        <p className="text-center text-gray-600">No ads created yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300"
            >
              <img
                src={ad.imageUrl || "https://via.placeholder.com/400"}
                alt={ad.productName}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-green-900">
                  {ad.productName}
                </h3>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {ad.description}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Type: {ad.adType} | Price: ₹{ad.price}
                </p>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleUpdate(ad)}
                    className="flex-1 px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
            <h2 className="text-2xl font-bold mb-4">Update Ad</h2>

            <label className="block mb-2 font-semibold">Product Name</label>
            <input
              type="text"
              value={editingAd.productName}
              onChange={(e) =>
                setEditingAd({ ...editingAd, productName: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-4"
            />

            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={editingAd.description}
              onChange={(e) =>
                setEditingAd({ ...editingAd, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-4"
            />

            <label className="block mb-2 font-semibold">Ad Type</label>
            <input
              type="text"
              value={editingAd.adType}
              onChange={(e) =>
                setEditingAd({ ...editingAd, adType: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-4"
            />

            <label className="block mb-2 font-semibold">Price</label>
            <input
              type="number"
              value={editingAd.price}
              onChange={(e) =>
                setEditingAd({ ...editingAd, price: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingAd(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
