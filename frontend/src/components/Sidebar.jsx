import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { useState } from 'react';
import '../App.css';

export default function Sidebar({ open, setOpen }) {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const [showCategories, setShowCategories] = useState(false);

  let items = [];
  console.log("user role in sidebar:", user.role);

  if (user?.role === 'user') {
    items = [
      { path: '/dashboard', label: 'Home' },
      { path: '/dashboard/food', label: 'food' },
      { path: '/dashboard/restaurant', label: 'restaurant' },
      { path: '/dashboard/contact', label: 'Contact' },
    ];
  } else if (user?.role === 'advertiser') {
    items = [
      { path: '/dashboard', label: 'Home' },
      { path: '/dashboard/upload', label: 'Upload Ad' },
      { path: '/dashboard/my-ads', label: 'Your Ads' },
      { path: '/dashboard/contact', label: 'Contact' },
    ];
  }

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <aside
        className={`fixed z-40 top-[64px] left-0 h-[calc(100%-64px)] w-45 bg-gradient-to-b from-white to-indigo-50 border-r shadow-xl transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:top-0 md:h-full`}
      >
        <div className="flex flex-col h-full px-2 py-2">
          {/* Nav Items */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {items.map((item) => {
              if (item.type === 'category') {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setShowCategories((prev) => !prev)}
                      className="w-full text-left block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                    >
                      {item.label} {showCategories ? '▲' : '▼'}
                    </button>

                    {showCategories && (
                      <div className="ml-2 space-y-1">
                        {item.subcategories.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            className={({ isActive }) =>
                              `block rounded-lg px-3 py-1 text-sm transition-colors ${
                                isActive
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-500'
                              }`
                            }
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                    }`
                  }
                  onClick={() => setOpen(false)}
                  end
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* User Info + Logout */}
          <div className="mt-6 border-t pt-4">
            <div className="mb-2 text-sm text-gray-600">
              <span className="font-medium text-gray-800">{user?.name}</span> &middot;
              <span className="ml-1 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                {user?.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-2 px-3 py-2 text-sm font-semibold text-gray-600 rounded-lg bg-white border border-gray-200 shadow-inner hover:bg-gray-100 hover:text-red-600 transition-all duration-200"
            >
              🔓 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
