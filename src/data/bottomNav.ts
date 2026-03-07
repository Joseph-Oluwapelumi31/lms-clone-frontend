import { GraduationCap, UserRound, NotebookText, Home, Users, PlusSquare } from "lucide-react";

export const studentLinks = [
  { name: "Home", path: "/student/dashboard", icon: Home },
  { name: "Courses", path: "/student/courses", icon: NotebookText },
  { name: "Academics", path: "/student/academics", icon: GraduationCap },
  { name: "Profile", path: "/student/profile", icon: UserRound },
];

export const instructorLinks = [
  { name: "Home", path: "/instructor/dashboard", icon: Home },
  { name: "Courses", path: "/instructor/courses", icon: NotebookText },
  { name: "Create", path: "/instructor/courses/new", icon: PlusSquare },
  { name: "Profile", path: "/instructor/profile", icon: UserRound },
];

export const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Courses", path: "/admin/courses", icon: NotebookText },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Profile", path: "/admin/profile", icon: UserRound },
];
