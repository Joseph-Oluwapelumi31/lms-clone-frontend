import { Calendar, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Course, Student } from "../../types/instructorDashboard";
import { useAuth } from "../../hooks/useAuth";

type CourseResponse = {
  success: boolean;
  data: Course[];
};

const Enrollment = () => {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get<CourseResponse>("/courses/published");
        setCourses(res.data.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (id: string) => {
    try {
      setEnrollingId(id);

      await api.post(`/courses/${id}/enroll`);

      setCourses((prev) =>
        prev.map((course) =>
          course._id === id
            ? {
                ...course,
                students: [...course.students, { _id: user!.id } as Student],
              }
            : course
        )
      );
    } catch (error) {
      console.error("Enrollment failed:", error);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <section className="relative">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">
          Explore Available Courses
        </h1>

        <p className="text-muted mt-2">
          Discover new courses and enroll for the current semester.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted">
          Loading courses...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const isEnrolled = course.students.some(
              (student: Student) =>
                student._id?.toString() === user?.id?.toString() ||
                student.toString?.() === user?.id?.toString()
            );

            return (
              <div
                key={course._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Thumbnail */}
                <img
                  src={
                    course.thumbnail?.url ||
                    "https://placehold.co/600x400?text=Course"
                  }
                  alt={course.title}
                  className="h-52 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  {/* Code + Status */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {course.code}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isEnrolled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isEnrolled ? "Enrolled" : "Available"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 line-clamp-2 text-xl font-bold text-text">
                    {course.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-5 line-clamp-3 text-sm leading-6 text-muted">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="mb-5 flex items-center justify-between text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <NotebookText className="h-4 w-4" />
                      <span>{course.lessons.length} Lessons</span>
                    </div>

                    <span>{course.students.length} Students</span>
                  </div>

                  {/* Button */}
                  <button
                    disabled={isEnrolled || enrollingId === course._id}
                    onClick={() => handleEnroll(course._id)}
                    className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                      isEnrolled
                        ? "cursor-not-allowed bg-green-600 text-white"
                        : enrollingId === course._id
                        ? "cursor-wait bg-gray-400 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                    }`}
                  >
                    {isEnrolled
                      ? "Enrolled"
                      : enrollingId === course._id
                      ? "Enrolling..."
                      : "Enroll Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-blue-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">
            Session: 2025/2026 (Rain Semester)
          </span>
        </div>

        <Link
          to="/student/courses"
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <NotebookText className="h-5 w-5" />
          My Enrolled Courses
        </Link>
      </div>
    </section>
  );
};

export default Enrollment;