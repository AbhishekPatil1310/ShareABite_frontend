import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  const featuredDishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Pizza Palace",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2023/07/margherita-pizza-recipe.jpg",
      type: "Free",
    },
    {
      id: 2,
      name: "Cheese Burger",
      restaurant: "Burger Hub",
      image: "https://cdn.uengage.io/uploads/6670/image-919341-1677051044.jpeg",
      type: "Low Cost",
    },
    {
      id: 3,
      name: "California Roll",
      restaurant: "Sushi World",
      image: "https://www.masalaherb.com/wp-content/uploads/2020/07/California-Roll-gog-1.jpg",
      type: "Free",
    },
  ];

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

    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleExploreClick = () => {
    if (user) navigate("/dashboard");
    else navigate("/signin");
  };

  return (
    <div id="home" className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 text-white text-center py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-red-200/30 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Find Free or Affordable Food Near You
        </h1>
        <p className="relative mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Discover nearby community kitchens, charities, and restaurants offering free or low-cost meals.
        </p>
        <button
          onClick={handleExploreClick}
          className="relative mt-6 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all shadow-lg"
        >
          Explore Locations
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row justify-around items-center gap-8 py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        {[
          {
            icon: "🍽️",
            title: "Free & Affordable Food",
            text: "Locate meals that are free or priced very low to help those in need.",
          },
          {
            icon: "🏠",
            title: "Community Support",
            text: "Partnering with trusted NGOs and local restaurants to provide meals.",
          },
          {
            icon: "📍",
            title: "Easy to Find",
            text: "Quickly search by dish, type of food, or location.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="fade-section opacity-0 translate-y-6 text-center bg-white/60 backdrop-blur-md rounded-xl p-6 border border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <h3 className="text-4xl">{item.icon}</h3>
            <h4 className="mt-3 text-2xl font-bold text-gray-800">{item.title}</h4>
            <p className="mt-2 text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Featured Dishes */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Featured Dishes & Locations
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="fade-section opacity-0 translate-y-6 relative group bg-white/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="relative w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative p-5 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{dish.name}</h4>
                <p className="text-lg text-gray-700 mt-1">{dish.restaurant}</p>
                <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  dish.type === "Free" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                }`}>
                  {dish.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
