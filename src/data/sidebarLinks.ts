import {
  Home,
  NotebookText,
  GraduationCap,
  Bell,
  UserRound,
  PlusSquare,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";

export const studentLinks = [
  { name: "Dashboard", path: "/student/dashboard", icon: Home },
  { name: "Courses", path: "/student/courses", icon: NotebookText },
  { name: "Enrollment", path: "/student/enrollment", icon: PlusSquare },
  { name: "Academics", path: "/student/academics", icon: GraduationCap },
  { name: "Notifications", path: "/student/notifications", icon: Bell },
  { name: "Profile", path: "/student/profile", icon: UserRound },
];

export const instructorLinks = [
  { name: "Dashboard", path: "/instructor/dashboard", icon: Home },
  { name: "My Courses", path: "/instructor/courses", icon: BookOpen },
  { name: "Create Course", path: "/instructor/courses/new", icon: PlusSquare },
  { name: "Students", path: "/instructor/students", icon: Users },
  { name: "Profile", path: "/instructor/profile", icon: UserRound },
];

export const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Courses", path: "/admin/courses", icon: NotebookText },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
  { name: "Profile", path: "/admin/profile", icon: UserRound },
];