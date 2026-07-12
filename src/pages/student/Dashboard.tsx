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
    <section className="lg:relative flex flex-col gap-6">
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
        <h1 className="font-bold text-2xl">Hey, {user?.name} ✨</h1>
        <p>
          <span className="text-muted">Semester:</span> Rain •{" "}
          <span className="text-muted">Session:</span> 2025/2026
        </p>
      </div>

      <div className="lg:hidden">
        <h2 className="text-text font-bold text-md mt-6 mb-4">Quick Access</h2>
        <div className="flex justify-around">
          <Link to="/student/results" className="flex flex-col gap-2">
            <ChartLine className="h-12 w-12 bg-white p-3 rounded-xl text-[#0d6efd]" />
            <p className="text-muted font-bold text-xs">Results</p>
          </Link>

          <Link to="/student/attendance" className="flex flex-col gap-2">
            <CalendarCheck className="h-12 w-12 bg-white p-3 rounded-xl text-[#6f42c1]" />
            <p className="text-muted font-bold text-xs">Attend</p>
          </Link>

          <Link to="/student/assignments" className="flex flex-col gap-2">
            <NotebookText className="h-12 w-12 bg-white p-3 rounded-xl text-[#dc3545]" />
            <p className="text-muted font-bold text-xs">Notes</p>
          </Link>

          <Link to="/student/dashboard" className="flex flex-col gap-2">
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
            <div className="flex h-60 items-center justify-center rounded-2xl bg-white shadow-sm">
              <p className="text-muted">You are not enrolled in any course yet.</p>
            </div>
          ) : (
            <div className="mx-auto mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnail?.url}
                    alt={course.title}
                    className="aspect-video w-full object-cover"
                  />

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Course Code */}
                    <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {course.code}
                    </span>
              
                    {/* Title */}
                    <h3 className="mt-4 text-lg font-bold text-text line-clamp-2">
                      {course.title}
                    </h3>
              
                    {/* Description */}
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
                      {course.description}
                    </p>
              
                    {/* Footer */}
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <NotebookText className="h-4 w-4" />
                        <span>{course.lessons.length} Lessons</span>
                      </div>
              
                      <Link
                        to={`/student/courses/${course._id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Continue
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
