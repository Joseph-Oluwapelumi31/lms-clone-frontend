import { Link} from "react-router-dom"
import type { Course } from "../../types/instructorDashboard";
import { Pencil, PlusCircle, Trash2, Loader2, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";



type CoursesResponse = {
  data: Course[];
};



const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseForDelete, setSelectedCourseForDelete] = useState<Course | null>(null);
  
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

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourseForDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourseForDelete) return;

    try {
      setIsDeleting(true);
      setCourseToDelete(selectedCourseForDelete._id);
      await api.delete(`/courses/${selectedCourseForDelete._id}`);
      setCourses((prev) => prev.filter((course) => course._id !== selectedCourseForDelete._id));
      setShowDeleteModal(false);
      setSelectedCourseForDelete(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    } finally {
      setIsDeleting(false);
      setCourseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCourseForDelete(null);
  };


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
     className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
     >
      <Link to={`/instructor/courses/${course._id}`} className="absolute inset-0" />
       {/* Course Thumbnail */}
       <img
         src={course.thumbnail.url}
         alt={course.title}
         className="h-44 w-full object-cover"
       />
    
       {/* Status Badge */}
       <span
         className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
           course.isPublished
             ? "bg-green-100 text-green-700"
             : "bg-yellow-100 text-yellow-700"
         }`}
       >
         {course.isPublished ? "Published" : "Draft"}
       </span>
        
       {/* Card Content */}
       <div className="flex flex-1 flex-col justify-between p-5">
         <div>
           <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
             {course.title}
           </h3>
        
           <p className="mt-2 line-clamp-2 text-sm text-slate-600">
             {course.description}
           </p>
        
           {/* Stats */}
           <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
             <span className="flex items-center gap-1">
               <Users size={16} />
               {course.students.length} Students
             </span>
        
             <span className="flex items-center gap-1">
               <BookOpen size={16} />
               {course.lessons.length} Lessons
             </span>
           </div>
         </div>
        
         {/* Action Buttons */}
         <div className="relative z-20 mt-6 flex gap-2">
           
             <Link
               to={`/instructor/courses/${course._id}/edit`}
               className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
             >
               <Pencil size={16} />
               Edit
             </Link>
             <button
               onClick={() => handleDeleteCourse(course)}
               disabled={isDeleting && courseToDelete === course._id}
               className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
             >
               {isDeleting && courseToDelete === course._id ? (
                 <>
                   <Loader2 size={16} className="animate-spin" />
                   Deleting...
                 </>
               ) : (
                 <>
                   <Trash2 size={16} />
                   Delete
                 </>
               )}
             </button>
              
              
              
         </div>
       </div>
     </div>

   
  ))}
  </section>

  {/* Delete Confirmation Modal */}
  {showDeleteModal && selectedCourseForDelete && (
    <div className="fixed inset-0 bg-black/40 bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
        <h2 className="text-xl font-bold text-red-700 mb-4">Delete Course</h2>
        
        <div className="mb-6 space-y-3">
          <p className="text-gray-700 font-semibold">
            Are you sure you want to delete <span className="text-red-600">"{selectedCourseForDelete.title}"</span>?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <p className="font-semibold mb-2">⚠️ This action will also:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Delete all lessons associated with this course</li>
              <li>Remove all {selectedCourseForDelete.students.length} students enrolled in this course</li>
            </ul>
          </div>

          <p className="text-gray-500 text-sm">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={cancelDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Course"}
          </button>
        </div>
      </div>
    </div>
  )}
  </>
  )
}

export default Courses