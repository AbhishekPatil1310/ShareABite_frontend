import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DonorPage() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-section").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  const handleDonateClick = () => {
    if (user) navigate("upload");
    else navigate("/signin");
  };

  const handleManageClick = () => {
    if (user) navigate("my-ads");
    else navigate("/signin");
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 text-white text-center py-28 px-6 rounded-b-3xl relative overflow-hidden drop-shadow-lg">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-md">
          Share Food, Spread Happiness
        </h1>
        <p className="mt-2 text-xl md:text-2xl max-w-3xl mx-auto font-light drop-shadow-sm">
          List your surplus food and help people in need. Together, we can
          reduce food waste and fight hunger.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={handleDonateClick}
            className="px-8 py-3 rounded-full bg-white text-green-600 font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
          >
            Donate Food
          </button>
          <button
            onClick={handleManageClick}
            className="px-8 py-3 rounded-full bg-white text-cyan-600 font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
          >
            Manage Donations
          </button>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-14 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-green-700 drop-shadow-sm">
          Why Donate?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="fade-section opacity-0 translate-y-6 p-6 bg-white/90 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-500 text-center">
            <h3 className="text-2xl font-semibold text-green-900">
              Reduce Waste
            </h3>
            <p className="mt-2 text-gray-600">
              Don’t throw away surplus food. Instead, share it with those who
              need it.
            </p>
          </div>
          <div className="fade-section opacity-0 translate-y-6 p-6 bg-white/90 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-500 text-center">
            <h3 className="text-2xl font-semibold text-green-900">
              Help People
            </h3>
            <p className="mt-2 text-gray-600">
              Every donation makes a difference in someone’s life.
            </p>
          </div>
          <div className="fade-section opacity-0 translate-y-6 p-6 bg-white/90 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-500 text-center">
            <h3 className="text-2xl font-semibold text-green-900">
              Build Community
            </h3>
            <p className="mt-2 text-gray-600">
              Connect with local people and be part of a stronger community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
