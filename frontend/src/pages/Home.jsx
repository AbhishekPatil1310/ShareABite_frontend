import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const restaurants = [
  { id: 1, name: "Pizza Palace", image: "https://i.ibb.co/6H8k2zJ/pizza.jpg" },
  { id: 2, name: "Burger Hub", image: "https://i.ibb.co/9yvHj3h/burger.jpg" },
  { id: 3, name: "Sushi World", image: "https://i.ibb.co/Z2r4nGJ/sushi.jpg" },
];

const featuredDishes = [
  {
    id: 1,
    name: "Margherita Pizza",
    restaurant: "Pizza Palace",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2023/07/margherita-pizza-recipe.jpg",
  },
  {
    id: 2,
    name: "Cheese Burger",
    restaurant: "Burger Hub",
    image: "https://cdn.uengage.io/uploads/6670/image-919341-1677051044.jpeg",
  },
  {
    id: 3,
    name: "California Roll",
    restaurant: "Sushi World",
    image: "https://www.masalaherb.com/wp-content/uploads/2020/07/California-Roll-gog-1.jpg",
  },
];

export default function HomePage() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (user) navigate("food");
    else navigate("/signin");
  };

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
    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white text-center py-28 px-6 rounded-b-3xl relative overflow-hidden drop-shadow-lg">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-md">
          Find Free or Affordable Meals
        </h1>
        <p className="mt-2 text-xl md:text-2xl max-w-3xl mx-auto font-light drop-shadow-sm">
          Discover nearby restaurants offering free or low-cost meals for people in need.
        </p>
        <button
          onClick={handleExploreClick}
          className="mt-8 px-8 py-3 rounded-full bg-white text-red-600 font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
        >
          Explore Restaurants
        </button>
      </section>

      {/* Featured Dishes */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-red-700 drop-shadow-sm">
          Featured Dishes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="fade-section opacity-0 translate-y-6 relative group bg-white/90 rounded-2xl border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="relative w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 text-center">
                <h4 className="text-2xl font-semibold text-red-900">{dish.name}</h4>
                <p className="text-lg text-red-700 mt-2">{dish.restaurant}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Restaurants */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-red-700 drop-shadow-sm">
          Available Restaurants
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {restaurants.map((res) => (
            <div
              key={res.id}
              className="fade-section opacity-0 translate-y-6 group bg-white/90 rounded-2xl border border-red-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              onClick={() => navigate(`/restaurant/${res.id}`)}
            >
              <img
                src={res.image}
                alt={res.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-red-900">{res.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
