import {CirclePlus, NotebookText, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Course } from "../../types/instructorDashboard";
import { useAuth } from "../../hooks/useAuth";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/enrolled");
        setCourses(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [user?.id]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-text font-bold text-xl mb-2">My Courses</h1>
          <p className="text-sm">{courses.length} Active Subscription{courses.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="flex md:hidden items-center gap-2 mt-4">
          <Link to="/student/enrollment">
            <CirclePlus className="h-10 w-10 rounded-full p-2 bg-white hover:text-blue-500 cursor-pointer" />
          </Link>
        </div>

        <div className="hidden md:block bg-bg text-white px-4 py-2 rounded-full hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer duration-300">
          <Link to="/student/enrollment" className="flex justify-center items-center gap-1">
            <CirclePlus className="h-6 w-6 rounded-full cursor-pointer" />
            <p>Enroll</p>
          </Link>
        </div>
      </div>

      <div className="mt-6 relative w-full md:hidden">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        <input
          type="text"
          placeholder="Search courses..."
          className="placeholder:text-muted text-md w-full pl-12 pr-4 py-4 bg-white rounded-full focus:outline-none"
        />
      </div>

      {/* Mobile section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
  {courses.map((course) => (
    <Link
      key={course._id}
      to={`/courses/${course._id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        src={course.thumbnail?.url}
        alt={course.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {course.code}
          </span>

          <span className="text-sm text-muted">
            {course.lessons.length} Lessons
          </span>
        </div>

        <h2 className="font-bold text-lg mb-2 line-clamp-2">
          {course.title}
        </h2>

        <p className="text-sm text-muted mb-5 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted">
            <NotebookText className="h-4 w-4" />
            <span>{course.students.length} Students</span>
          </div>

          <Link 
            to={`/student/courses/${course._id}`}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-blue-700">
            Continue
          </Link>
        </div>
      </div>
    </Link>
  ))}
</div>
    </section>
  );
};

export default Courses;