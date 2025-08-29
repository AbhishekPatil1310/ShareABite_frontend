import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const anchors = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const showNavbar = pathname === "/";
  const hideNavbar = pathname === "/signin" || pathname === "/signup";

  if (hideNavbar) return null;

  const handleAnchorClick = (id) => () => {
    setActiveId(id);
    setMobileMenuOpen(false); // close mobile menu on click
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          <img src="/logoRM&R1.png" alt="Logo" className="w-6 h-6" />
          RM&R
        </Link>

        {/* Desktop Anchors */}
        <ul className="hidden sm:flex space-x-4">
          {anchors.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleAnchorClick(id)}
                className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                  activeId === id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right-side Sign In / Hamburger */}
        <div className="flex items-center gap-2">
          {showNavbar && (
            <NavLink
              to="/signin"
              className="hidden sm:inline-block rounded px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Sign In
            </NavLink>
          )}

          {/* Hamburger for mobile */}
          <button
            className="sm:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col space-y-2 p-4">
            {anchors.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleAnchorClick(id)}
                  className={`block rounded px-3 py-2 text-sm font-medium transition-colors ${
                    activeId === id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            {showNavbar && (
              <NavLink
                to="/signin"
                className="block rounded px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
