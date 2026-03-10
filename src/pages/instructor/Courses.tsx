import { Link} from "react-router-dom"
import type { Course } from "../../types/instructorDashboard";
import { Pencil, Eye , PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";



type CoursesResponse = {
  data: Course[];
};



const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res  = await api.get<CoursesResponse>("/courses");
        console.log(res.data);
        setCourses(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);


  return(
  <>
  {/* Header */}
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
    <div>
      <h1 className="text-2xl font-bold text-text md:text-3xl">
        My Courses
      </h1>
      <p className="text-sm text-slate-600">
        All published and unpublished courses
      </p>
    </div> 
    <Link to={'/instructor/courses/new'} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 hover:cursor-pointer">
      <PlusCircle size={18} />
      Create New Course
    </Link>
  </div>
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

  {courses.map((course) => (
    <div
      key={course._id}
      className="rounded-2xl border border-slate-200 bg-white p-4 relative"
    >
      <div className="flex flex-col gap-3  md:justify-between">
        <div>
          <div className="flex lg:flex-col  gap-2">
            <div >
              <h3 className="font-bold text-text mb-4">
                {course.title}
              </h3>
              <p className="line-clamp-2 text-sm text-slate-600">
                {course.description}
              </p>
            </div>

            

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium absolute right-4  ${
                course.isPublished 
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {course.isPublished ? 'Published' : "Draft"}
            </span>
          </div>
    
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>{course.students.length} students</span>
            <span>{course.instructor.email} lessons</span>
          </div>
        </div>
    
        <div className="flex flex-wrap gap-2 ">
          <Link to={`/instructor/courses/${course._id}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:cursor-pointer">
            <Eye size={16} />
            View
          </Link>
    
          <Link to={`/instructor/courses/${course._id}/edit`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Pencil size={16} />
            Edit
          </Link>
        </div>
      </div>
    </div>
  ))}
  </section>
  </>
  )
}

export default Courses