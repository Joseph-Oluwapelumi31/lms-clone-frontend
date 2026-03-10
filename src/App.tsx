import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student pages
import Dashboard from "./pages/student/Dashboard";
import Courses from "./pages/student/Courses";
import Results from "./pages/student/Results";
import Profile from "./pages/student/Profile";
import Notification from "./pages/student/Notification";
import Forum from "./pages/student/Forum";
import Enrollment from "./pages/student/Enrollment";
import Calender from "./pages/student/Calender";
import Attendance from "./pages/student/Attendance";
import { Assignment } from "./pages/student/Assignment";
import Academics from "./pages/student/Academics";

// Instructor pages
import InstructorDashboard from "./pages/instructor/Dashboard";
import InstructorCourses from "./pages/instructor/Courses";
import CreateCourse from "./pages/instructor/CreateCourse";
import InstructorStudents from "./pages/instructor/Students";
import InstructorProfile from "./pages/instructor/Profile";
import CourseDetail from "./pages/instructor/CourseDetail";
import EditCourse from "./pages/instructor/EditCourse";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";
import AdminProfile from './pages/admin/Profile'

import NotFound from "./pages/NotFound";
import RoleRoute from "./pages/routes/RoleRoutes";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          {/* Student routes */}
          <Route element={<RoleRoute allowedRoles={['student']}/>}>
            <Route path="/student" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="results" element={<Results />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notification" element={<Notification />} />
              <Route path="forum" element={<Forum />} />
              <Route path="enrollment" element={<Enrollment />} />
              <Route path="calender" element={<Calender />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignment" element={<Assignment />} />
              <Route path="academics" element={<Academics />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          

          {/* Instructor routes */}
          <Route element={<RoleRoute allowedRoles={['instructor']}/>}>
            <Route path="/instructor" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<InstructorDashboard />} />
              <Route path="courses" element={<InstructorCourses />} />
              <Route path="courses/new" element={<CreateCourse />} />
              <Route path="students" element={<InstructorStudents />} />
              <Route path="profile" element={<InstructorProfile />} />
              <Route path="courses/:id" element={<CourseDetail/>}/>
              <Route path="courses/:id/edit" element={<EditCourse/>}/>
              <Route path="*" element={<NotFound />} />

            </Route>
          </Route>


          {/* Admin routes */}
          <Route element={<RoleRoute allowedRoles={['admin']}/>}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="*" element={<NotFound />} />
            
            </Route>
          </Route>
 
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}