import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import Forum from "./pages/Forum";
import Enrollment from "./pages/Enrollment";
import Calender from "./pages/Calender";
import Attendance from "./pages/Attendance";
import { Assignment } from "./pages/Assignment";
import NotFound from "./pages/NotFound";
import Academics from "./pages/Academics";
import Dashboard from "./pages/Dashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/academics" element={<Academics />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      
    </BrowserRouter>
  );
}