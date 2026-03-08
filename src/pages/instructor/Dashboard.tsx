
import {
  BookOpen,
  Users,
  Video,
  DollarSign,
  PlusCircle,
  Eye,
  Pencil,
  BarChart3,
  Clock3,
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  students: number;
  lessons: number;
  status: "Published" | "Draft";
};

type Student = {
  id: number;
  name: string;
  course: string;
  progress: number;
};

type Activity = {
  id: number;
  message: string;
  time: string;
};

export default function InstructorDashboard() {
  const stats = [
    {
      title: "Total Courses",
      value: 6,
      icon: BookOpen,
    },
    {
      title: "Total Students",
      value: 148,
      icon: Users,
    },
    {
      title: "Total Lessons",
      value: 42,
      icon: Video,
    },
    {
      title: "Revenue",
      value: "$1,250",
      icon: DollarSign,
    },
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: "React for Beginners",
      students: 45,
      lessons: 12,
      status: "Published",
    },
    {
      id: 2,
      title: "Advanced CSS Mastery",
      students: 31,
      lessons: 10,
      status: "Published",
    },
    {
      id: 3,
      title: "Node.js API Bootcamp",
      students: 18,
      lessons: 8,
      status: "Draft",
    },
  ];

  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      course: "React for Beginners",
      progress: 70,
    },
    {
      id: 2,
      name: "Mary Jane",
      course: "Advanced CSS Mastery",
      progress: 45,
    },
    {
      id: 3,
      name: "David James",
      course: "React for Beginners",
      progress: 90,
    },
  ];

  const activities: Activity[] = [
    {
      id: 1,
      message: "A new student enrolled in React for Beginners",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "You published Advanced CSS Mastery",
      time: "Yesterday",
    },
    {
      id: 3,
      message: "Lesson 3 was added to Node.js API Bootcamp",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Instructor Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Manage your courses, students, and teaching activity.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
            <PlusCircle size={18} />
            Create New Course
          </button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-500">
              Shortcuts to common instructor tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50">
              <PlusCircle className="text-slate-700" size={20} />
              <span className="font-medium text-slate-800">Create Course</span>
            </button>

            <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50">
              <Pencil className="text-slate-700" size={20} />
              <span className="font-medium text-slate-800">Edit Courses</span>
            </button>

            <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50">
              <Users className="text-slate-700" size={20} />
              <span className="font-medium text-slate-800">View Students</span>
            </button>

            <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50">
              <BarChart3 className="text-slate-700" size={20} />
              <span className="font-medium text-slate-800">Analytics</span>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Courses */}
          <section className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  My Courses
                </h2>
                <p className="text-sm text-slate-500">
                  Your most recent courses.
                </p>
              </div>

              <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {course.title}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            course.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>{course.students} students</span>
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Eye size={16} />
                        View
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Pencil size={16} />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Activity
              </h2>
              <p className="text-sm text-slate-500">
                Latest updates on your account.
              </p>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-800">{activity.message}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Students */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Enrollments
              </h2>
              <p className="text-sm text-slate-500">
                Track student activity and progress.
              </p>
            </div>

            <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
              View all students
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="pb-2 font-medium">Student</th>
                  <th className="pb-2 font-medium">Course</th>
                  <th className="pb-2 font-medium">Progress</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="rounded-xl bg-slate-50 text-sm text-slate-700"
                  >
                    <td className="rounded-l-xl px-4 py-3 font-medium text-slate-900">
                      {student.name}
                    </td>
                    <td className="px-4 py-3">{student.course}</td>
                    <td className="rounded-r-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-full max-w-[140px] rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-slate-900"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span>{student.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}