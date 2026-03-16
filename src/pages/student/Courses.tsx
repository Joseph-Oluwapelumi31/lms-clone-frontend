import { ChevronRight, CirclePlus, NotebookText, SearchIcon } from "lucide-react";
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
      {courses.map((course) => (
        <div
          key={course._id}
          className="flex md:hidden justify-between items-center p-4 mt-8 bg-white rounded-xl gap-3 h-24 shadow-md"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="px-3 py-1 h-15 rounded-sm text-xs font-bold bg-bg text-white flex items-center justify-center">
              {course.code}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate">{course.title}</h3>
              <p className="text-sm text-muted truncate">{course.description}</p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted" />
        </div>
      ))}

      {/* Desktop section */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div>
              <h3 className="font-bold h-30 text-xl bg-bg text-white items-center flex justify-center">
                {course.code}
              </h3>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-text font-bold mb-4">{course.title}</h3>
              <p className="text-sm text-muted mb-4 line-clamp-4">{course.description}</p>

              <div className="flex justify-between items-center mt-auto">
                <div>
                  <NotebookText className="h-4 w-4 text-muted inline mr-2" />
                  <span className="text-muted text-sm">Nov 11</span>
                </div>

                <Link
                  to={`/courses/${course._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;