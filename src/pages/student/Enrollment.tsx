import { Calendar, NotebookText, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Course } from "../../types/instructorDashboard";
import { useAuth } from "../../hooks/useAuth";

type CourseResponse = {
  success: boolean;
  data: Course[];
};

const Enrollment = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get<CourseResponse>("/courses/published");
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

  const handleEnroll = async(id : string)=>{
    await api.post(`/courses/${id}/enroll`); 
  }

  return (
    <section className="relative">
      {/* Title mobile section */}
      <div className="md:hidden">
        <h1 className="text-text font-bold text-xl mb-2">Available Courses</h1>
        <p className="text-muted text-sm">2025/2026 • Rain Semester</p>
      </div>

      {/* Title desktop section */}
      <div className="md:block hidden">
        <h1 className="text-text font-bold text-xl mb-2">Explore Courses</h1>
        <p className="text-muted text-sm">
          Discover new subjects and enroll for session 2025/2026 (Rain Semester)
        </p>
      </div>

      {loading ? (
        <p className="text-muted mt-4">Loading courses...</p>
      ) : (
        <>
          {/* Course cards md and lg section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const isEnrolled = course.students?.some((studentId) => {
                return studentId.toString() === user?.id?.toString();
              });

              return (
                <div
                  key={course._id}
                  className="md:flex md:flex-col mt-4 bg-white rounded-xl gap-2 shadow-md hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer duration-300"
                >
                  <div>
                    <h3 className="font-bold h-30 rounded-2xl text-xl bg-bg text-white items-center flex justify-center">
                      {course.code}
                    </h3>
                  </div>

                  <div className="p-4">
                    <h3 className="text-text font-bold">{course.title}</h3>

                    <div className="flex justify-between items-center">
                      <div className="mb-4">
                        <NotebookText className="h-4 w-4 text-muted inline mr-2" />
                        <span className="text-muted">
                          {isEnrolled ? "Enrolled" : "Not Enrolled"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <button className="flex items-center w-full cursor-pointer justify-center border border-[#dc3545] text-[#dc3545] hover:text-white hover:bg-[#dc3545] p-2 rounded-full hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                      {isEnrolled ? "Enrolled" : "Enroll Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Course cards mobile section */}
          <div className="md:hidden">
            {courses.map((course) => {
              const isEnrolled = course.students?.some((studentId) => {
                return studentId.toString() === user?.id?.toString();
              });

              return (
                <div
                  key={course._id}
                  className="flex justify-between items-center p-4 mt-8 bg-white rounded-xl gap-3 h-24 shadow-md"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="px-3 py-1 h-15 rounded-sm text-xs font-bold bg-bg text-white flex items-center justify-center">
                      {course.code}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold truncate">{course.title}</h3>
                      <p className="text-sm text-muted truncate">
                        {isEnrolled ? "Enrolled" : "Not Enrolled"}
                      </p>
                    </div>
                  </div>

                  <Plus onClick={() => handleEnroll(course._id)} className="h-10 w-10 rounded-full cursor-pointer text-blue-500 bg-slate-50 p-2" />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Absolute CTA */}
      <div className="absolute top-0 right-0 hidden md:block">
        <div className="text-[#0d6efd] border border-[#0d6efd] flex items-center gap-1 px-4 py-2 font-medium rounded-full text-xs">
          <Calendar className="h-4 w-4 rounded-full" />
          <p>Session: 2025/2026 (Harmattan)</p>
        </div>

        <Link
          to={"/student/courses"}
          className="flex items-center gap-1 mt-4 bg-white text-text px-4 py-2 rounded-full shadow-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer duration-300"
        >
          <NotebookText className="h-6 w-6 rounded-full cursor-pointer" />
          <p>My Enrolled Courses</p>
        </Link>
      </div>
    </section>
  );
};

export default Enrollment;
