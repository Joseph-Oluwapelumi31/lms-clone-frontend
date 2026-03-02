import { NavLink } from "react-router-dom";
import { GraduationCap, UserRound, NotebookText, Home } from "lucide-react";

const linkBase =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs";
const inactive = "text-muted";
const active = "text-text"; 
const hover = "hover:text-accent";

export default function BottomNav() {
  return (
    <nav className="h-14 w-full">
      <div className="mx-auto flex h-full max-w-md items-stretch">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
        >
          <NotebookText className="h-5 w-5" />
          <span>Courses</span>
        </NavLink>

        <NavLink
          to="/academics"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
        >
          <GraduationCap className="h-5 w-5" />
          <span>Academics</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
        >
          <UserRound className="h-5 w-5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}