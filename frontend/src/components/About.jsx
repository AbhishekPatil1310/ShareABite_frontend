import React, { useEffect } from "react";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Monkey D. Luffy",
      role: "Founder & CEO",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudROvgjmvrmVQQQrlA8EnuStqT6Y5dK815_EPkzWS-Gk-hJ5CB0yXUnjUjcHXncQ3Cao&usqp=CAU",
    },
    {
      id: 2,
      name: "Naruto Uzumaki",
      role: "Head of Partnerships",
      image: "/NarutoUzumaki.png",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Community Engagement Lead",
      image: "/EmilyDavis.png",
    },
  ];

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="about" className="font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 text-white text-center py-16 px-4 sm:py-24 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-28 h-28 sm:w-40 sm:h-40 bg-orange-300/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-28 sm:h-28 bg-red-200/30 rounded-full blur-2xl animate-spin-slow"></div>
        </div>
        <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          About Us
        </h1>
        <p className="relative mt-4 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
          Learn about our mission to provide free or affordable meals to those in need and support local communities.
        </p>
      </section>

      {/* Our Story */}
      <section className="fade-section opacity-0 translate-y-6 max-w-3xl sm:max-w-5xl mx-auto py-8 px-4 sm:py-12 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Our Story</h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center">
          Founded in 2025, FoodForAll was created to help people in need access nutritious meals at no or low cost.
          We connect users with community kitchens, charities, and restaurants that believe in giving back to society.
          Our goal is to make hunger a thing of the past while promoting compassion and community support.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-8 px-4 sm:py-12 sm:px-6">
        <div className="max-w-3xl sm:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          {[
            {
              icon: "🍲",
              title: "Our Mission",
              text: "To provide easy access to free or affordable meals for people in need.",
            },
            {
              icon: "🤝",
              title: "Community Support",
              text: "Partnering with verified local restaurants, charities, and volunteers.",
            },
            {
              icon: "🌍",
              title: "Transparency & Trust",
              text: "Ensuring all locations and meals are safe, reliable, and accessible to everyone.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="fade-section opacity-0 translate-y-6 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-xl p-4 sm:p-6 border border-transparent"
            >
              <h3 className="text-3xl sm:text-4xl">{item.icon}</h3>
              <h4 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold">{item.title}</h4>
              <p className="mt-2 text-gray-600 text-base sm:text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-8 px-4 sm:py-12 sm:px-6 max-w-3xl sm:max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="fade-section opacity-0 translate-y-6 bg-white/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover mt-4 sm:mt-6 border-4 border-gradient-to-tr from-red-500 via-orange-500 to-yellow-400"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg sm:text-xl font-semibold">{member.name}</h4>
                <p className="text-gray-600 text-base">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
