import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { studentLinks, instructorLinks, adminLinks } from "../data/bottomNav";

type Props = {
  closeSidebar: () => void;
};

const linkBase =
  "flex flex-col items-center justify-center gap-1 py-2 text-xs";
const inactive = "text-muted";
const active = "text-text";
const hover = "hover:text-accent";

export default function BottomNav({ closeSidebar }: Props) {
  const { user } = useAuth();

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "instructor"
      ? instructorLinks
      : studentLinks;

  return (
    <nav className="w-full bg-white">
      <ul className="flex w-full">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.path} className="flex-1">
              <NavLink
                to={link.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `${linkBase} w-full ${isActive ? active : inactive} ${hover}`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}