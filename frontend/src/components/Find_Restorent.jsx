import React, { useEffect, useState } from "react";
import { getAllAdvertisers, getAdsByAdvertiser } from "../api/userApi";
import AdCard from "./Adcard";

export default function AdvertisersList() {
  const [advertisers, setAdvertisers] = useState([]);
  const [selectedAds, setSelectedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(false);

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const data = await getAllAdvertisers();
        console.log("Fetched advertisers:", data);
        setAdvertisers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setAdvertisers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvertisers();
  }, []);

  const handleClick = async (advertiserId) => {
    setAdsLoading(true);
    try {
      const ads = await getAdsByAdvertiser(advertiserId);
      console.log("Fetched ads:", ads);
      setSelectedAds(Array.isArray(ads) ? ads : []);
    } catch (err) {
      console.error(err);
      setSelectedAds([]);
    } finally {
      setAdsLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 text-base sm:text-lg">
        Loading advertisers...
      </p>
    );

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Advertisers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {advertisers.map((adv) => (
          <button
            key={adv._id}
            onClick={() => handleClick(adv._id)}
            className="w-full text-left cursor-pointer p-4 bg-white shadow rounded-lg hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            type="button"
            aria-label={`View ads by ${adv.companyName}`}
          >
            <h3 className="text-lg font-medium">{adv.companyName}</h3>
            <p className="text-gray-600">{adv.name}</p>
          </button>
        ))}
      </div>

      {adsLoading && (
        <p className="text-center py-4 text-gray-600 text-base sm:text-lg">
          Loading ads...
        </p>
      )}

      {selectedAds.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
            Ads by this advertiser
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedAds.map((ad) => (
              <AdCard key={ad._id} ad={ad} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
