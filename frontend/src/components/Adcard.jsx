import React from 'react';

export default function AdCard({ ad }) {
  const advertiser = ad?.advertiserId;
  const location = advertiser?.address?.[0]?.location?.coordinates;
  const lat = Array.isArray(location) ? location[1] : null;
  const lng = Array.isArray(location) ? location[0] : null;

  const openDirections = () => {
    if (lat && lng) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      alert('Location not available');
    }
  };

  const imgSrc = ad?.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';
  const productName = ad?.productName || 'Untitled Product';
  const companyName = advertiser?.companyName || 'Unknown Hotel';
  const description = ad?.description || 'No description available.';
  const price = typeof ad?.price === 'number' ? ad.price.toFixed(2) : ad?.price || '--';

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] bg-gray-100 relative">
        <img
          src={imgSrc}
          alt={productName}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
          }}
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h2 className="text-lg sm:text-xl font-semibold mb-1 line-clamp-1">{productName}</h2>
        <p className="text-gray-600 mb-1 text-sm sm:text-base line-clamp-1">Hotel: {companyName}</p>
        <p className="text-gray-700 mb-3 flex-1 text-sm sm:text-base line-clamp-3">{description}</p>
        <p className="text-gray-900 font-semibold mb-3 text-sm sm:text-base">Price: ${price}</p>
        <button
          onClick={openDirections}
          disabled={!lat || !lng}
          className="py-2 w-full bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Get directions to the advertiser location"
          title={lat && lng ? 'Open directions in Google Maps' : 'Location not available'}
        >
          Get Directions
        </button>
      </div>
    </article>
  );
}
