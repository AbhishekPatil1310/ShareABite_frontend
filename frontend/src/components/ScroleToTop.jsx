import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton({ scrollRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef?.current || window;

    const toggleVisibility = () => {
      const scrollTop = scrollRef?.current ? scrollRef.current.scrollTop : window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    scrollElement.addEventListener("scroll", toggleVisibility);

    // Check visibility on mount
    toggleVisibility();

    return () => {
      scrollElement.removeEventListener("scroll", toggleVisibility);
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[999] bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
}
