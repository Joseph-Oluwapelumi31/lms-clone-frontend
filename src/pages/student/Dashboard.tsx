import { Link } from "react-router-dom";
import {
  GraduationCap,
  ChartLine,
  NotebookText,
  Bot,
  CalendarCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Course } from "../../types/instructorDashboard";

type CourseResponse = {
  success: boolean;
  data: Course[];
};

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get<CourseResponse>("/courses/enrolled");
        console.log(res.data);
        setCourses(res.data.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  

  return (
    <section>
      {/* mobile section */}
      <div className="flex justify-between lg:hidden">
        <div className="mb-2">
          <p className="text-muted">Welcome back,</p>
          <h1 className="text-text font-extrabold text-xl">{user?.name}</h1>
        </div>
        <div className="bg-white flex items-center justify-center rounded-full w-12 h-12">
          <span className="bg-yellow-300 flex items-center justify-center w-10 h-10 rounded-full">
            SC
          </span>
        </div>
      </div>

      <div className="flex justify-between bg-bg text-white p-6 rounded-xl lg:hidden">
        <div className="flex flex-col gap-1">
          <p className="bg-white w-30 text-center text-text rounded-2xl text-sm">
            Current Session
          </p>
          <h2 className="font-bold text-xl">2025/2026</h2>
          <p className="text-sm">Rain Semester</p>
        </div>
        <GraduationCap className="item-start h-10 w-10" />
      </div>

      {/* desktop section */}
      <div className="lg:flex lg:flex-col gap-2 justify-between bg-bg text-white p-12 rounded-xl hidden">
        <h1 className="font-bold text-2xl">Hey, SCI/24/25/0575 ✨</h1>
        <p>
          <span className="text-muted">Semester:</span> Rain •{" "}
          <span className="text-muted">Session:</span> 2025/2026
        </p>
      </div>

      <div className="lg:hidden">
        <h2 className="text-text font-bold text-md mt-6 mb-4">Quick Access</h2>
        <div className="flex justify-around">
          <Link to="/results" className="flex flex-col gap-2">
            <ChartLine className="h-12 w-12 bg-white p-3 rounded-xl text-[#0d6efd]" />
            <p className="text-muted font-bold text-xs">Results</p>
          </Link>

          <Link to="/attendance" className="flex flex-col gap-2">
            <CalendarCheck className="h-12 w-12 bg-white p-3 rounded-xl text-[#6f42c1]" />
            <p className="text-muted font-bold text-xs">Attend</p>
          </Link>

          <Link to="/assignment" className="flex flex-col gap-2">
            <NotebookText className="h-12 w-12 bg-white p-3 rounded-xl text-[#dc3545]" />
            <p className="text-muted font-bold text-xs">Notes</p>
          </Link>

          <Link to="/dashboard" className="flex flex-col gap-2">
            <Bot className="h-12 w-12 bg-white p-3 rounded-xl text-[#198754]" />
            <p className="text-muted font-bold text-xs">AI Chatbot</p>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-text font-bold text-md mt-6 mb-4">
            My Courses (Rain Semester)
          </h2>
          <Link
            to="/student/courses"
            className="text-blue-500 hover:underline text-xs font-extrabold"
          >
            See All
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-sm text-muted">Not enrolled in any course</p>
        ) : (
          <div className="flex flex-col gap-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col bg-white rounded-xl gap-2 max-w-70 shadow-md"
              >
                <div>
                  <h3 className="font-bold h-30 rounded-2xl text-xl bg-bg text-white items-center flex justify-center">
                    {course?.title || "COURSE"}
                  </h3>
                </div>

                <div className="p-4">
                  <h3 className="text-text font-bold mb-4">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted">
                      {course.createdAt
                        ? new Date(course.createdAt).toLocaleDateString()
                        : "No date"}
                    </p>
                    <Link
                      to={`/student/courses/${course._id}`}
                      className="bg-bg text-white px-4 py-2 rounded-full"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-text font-bold text-md mb-4">Upcoming Lessons</h2>
        <p className="text-muted text-sm">
          No upcoming lessons scheduled for enrolled courses.
        </p>
      </div>

      <div className="mt-6 lg:absolute lg:bottom-0 lg:right-12 lg:w-100">
        <h2 className="text-text font-bold text-md mb-4">Announcements</h2>
        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500">
          <h2 className="text-text font-bold text-md">Welcome to YOKLMS!</h2>
          <p className="text-sm text-muted">
            We are excited to have you on ....
          </p>
        </div>
      </div>
    </section>
  );
}
