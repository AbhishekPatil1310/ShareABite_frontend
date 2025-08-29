import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      type="button"
      className="relative w-48 h-14 bg-white text-black font-semibold text-xl rounded-2xl overflow-hidden group flex items-center justify-center"
    >
      {/* Expanding green bar */}
      <div className="absolute left-1 top-[4px] h-12 w-1/4 bg-green-400 rounded-xl flex items-center justify-center z-10 duration-500 group-hover:w-[184px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="25px"
          width="25px"
          fill="#000000"
        >
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
        </svg>
      </div>

      {/* Button text - visible initially, hidden on hover */}
      <span className="relative z-20 transition-opacity duration-300 group-hover:opacity-0">
        Go Back
      </span>
    </button>
  );
}
