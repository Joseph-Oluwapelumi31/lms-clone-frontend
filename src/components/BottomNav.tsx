import { NavLink } from "react-router-dom";
import { GraduationCap, UserRound, NotebookText, Home } from "lucide-react";

type Props = {
  closeSidebar: () => void;
};

const linkBase =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs";
const inactive = "text-muted";
const active = "text-text"; 
const hover = "hover:text-accent";

export default function BottomNav({closeSidebar}: Props) {
  return (
    <nav className="h-14 w-full">
      <div className="mx-auto flex h-full max-w-md items-stretch">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
          onClick={closeSidebar}
        
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
          onClick={closeSidebar}
        >
          <NotebookText className="h-5 w-5" />
          <span>Courses</span>
        </NavLink>

        <NavLink
          to="/academics"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
          onClick={closeSidebar}
        >
          <GraduationCap className="h-5 w-5" />
          <span>Academics</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive} ${hover}`
          }
          onClick={closeSidebar}
        >
          <UserRound className="h-5 w-5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}