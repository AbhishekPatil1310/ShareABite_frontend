import { useSelector } from 'react-redux';
import { UserCircle, Menu, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthNavbar({ setSidebarOpen }) {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      {/* Desktop / Tablet */}
      <div className="hidden md:flex items-center justify-between h-16 px-6">
        {/* Left: Greeting */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-semibold">
            Hi, <span className="text-indigo-600">{user?.name || 'User'}</span>
          </span>
        </div>

        {/* Center: Logo */}
        <h1
          className="text-2xl font-extrabold text-indigo-500 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/')}
        >
          ShareABite
        </h1>

        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/addresses')}
            className="flex items-center gap-1 bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            My Addresses
          </button>


          <UserCircle
            className="h-9 w-9 text-indigo-400 cursor-pointer hover:text-indigo-600 transition-colors duration-300"
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between h-16 px-4">
        {/* Left: Hamburger */}
        <button
          className="p-2 rounded-lg border border-gray-200 shadow hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Center: Logo */}
        <h1
          className="text-xl font-extrabold text-indigo-500 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/')}
        >
          ShareABite
        </h1>

        {/* Right: Icons only */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/addresses')}
            className="p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            title="My Addresses"
          >
            <MapPin className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/search')}
            className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <UserCircle
            className="h-8 w-8 text-indigo-400 cursor-pointer hover:text-indigo-600 transition-colors duration-300"
            onClick={() => navigate('/profile')}
            title="Profile"
          />
        </div>
      </div>
    </header>
  );
}
