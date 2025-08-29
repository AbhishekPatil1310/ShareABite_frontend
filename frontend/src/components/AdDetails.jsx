import React, { useEffect, useState } from "react";
import AdCard from "./Adcard";
import { getAllAds } from "../api/userApi";

export default function AdsList() {
  const [ads, setAds] = useState([]); // always start with an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await getAllAds(); // getAllAds() already returns data

        // Defensive check: ensure adsData is an array
        if (Array.isArray(adsData)) {
          setAds(adsData);
        } else if (adsData && typeof adsData === "object") {
          setAds([adsData]); // wrap single object in array
        } else {
          setAds([]); // fallback empty array
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setAds([]); // fallback empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 text-base sm:text-lg">
        Loading ads...
      </p>
    );
  if (!ads.length)
    return (
      <p className="text-center py-10 text-gray-500 text-base sm:text-lg">
        No ads available.
      </p>
    );

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
      {ads.map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
    </div>
  );
}
