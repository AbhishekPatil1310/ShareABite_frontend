import { useState } from "react";

export default function PriceBar({ maxPrice, setMaxPrice }) {
  const [priceRange, setPriceRange] = useState(maxPrice);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">
        Max Price: ₹{priceRange}
      </label>
      <input
        type="range"
        min="0"
        max="200000"
        value={priceRange}
        onChange={(e) => setPriceRange(Number(e.target.value))}
        onMouseUp={() => setMaxPrice(priceRange)}
        className="w-full"
      />
    </div>
  );
}
