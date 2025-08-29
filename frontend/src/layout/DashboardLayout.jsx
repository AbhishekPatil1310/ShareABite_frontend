import { Outlet } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import Sidebar from '../components/Sidebar';
import { useState, useRef } from 'react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null); // Ref for the scrollable container

  return (
    <div className="relative flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AuthNavbar setSidebarOpen={setSidebarOpen} />
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto bg-gray-50 p-8"
        >
          {/* Pass mainRef to child routes via context */}
          <Outlet context={{ mainRef }} />
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </div>
  );
}
