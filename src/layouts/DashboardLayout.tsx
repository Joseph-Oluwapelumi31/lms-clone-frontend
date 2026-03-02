import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";
  import { useState } from "react";

export default function DashboardLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    }
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:grid lg:grid-cols-5 lg:gap-2">
        {/* Sidebar: desktop only */}
        <aside className={`lg:block lg:col-span-1  bg-white ${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-lg` } >
          <Sidebar />
        </aside>

        {/* Main */}
        <div className="lg:col-span-4 min-h-screen">
          {/* Topbar */}
          <div className="sticky top-0 z-50  bg-white">
            <Topbar isOpen={isOpen} toggleDropdown={toggleDropdown} />
          </div>

          {/* Page Content */}
          <main className="p-4 pb-20 lg:pb-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* BottomNav: mobile/tablet only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-14  bg-white">
        <BottomNav />
      </div>
    </div>
  );
}