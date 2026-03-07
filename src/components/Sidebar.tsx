import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
// import type {Links} from '../types/linksProp'
import { instructorLinks, studentLinks, adminLinks } from "../data/sidebarLinks";




type Props = {
  isOpen: boolean;
  closeSideBar: () => void;
};



const Sidebar = ({ isOpen, closeSideBar }: Props) => {
  const {user} = useAuth();
  const links =
  user?.role === "admin"
  ? adminLinks
  : user?.role === "instructor"
  ? instructorLinks
  : studentLinks;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSideBar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white p-4
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0 lg:h-auto lg:w-auto lg:shadow-none`}
      >
        <X
          className="absolute top-4 right-4 hover:bg-muted/10 rounded-full p-2 w-10 h-10 cursor-pointer lg:hidden"
          onClick={closeSideBar}
        />

        <Logo />

        <nav className="mt-8">
          <ul className="flex flex-col gap-4">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeSideBar}
                    className={({ isActive }) =>
                      `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${
                        isActive ? "text-text bg-muted/10" : ""
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 inline mr-4" />
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              );
            })}

            <li>
              <button
                onClick={handleLogout}
                className="w-full text-[#dc3545] font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center"
              >
                <LogOut className="w-5 h-5 inline mr-4" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;