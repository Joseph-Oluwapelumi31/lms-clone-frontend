import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import { useState, useEffect } from "react";
import type { Course, Lesson } from "../../types/instructorDashboard";
import { Play, NotebookText, MoveLeft, ChevronDown, Check, MessageCircleMore} from "lucide-react";

type CoursesResponse = {
  data: {
    course: Course;

    enrollmentCount: number;
  };
};



type Tab = {
  key: string;
  label: string;
};

const tabs: Tab[] = [
  { key: "about", label: "About" },
  { key: "lessons", label: "Lessons" },
  { key: "discussion", label: "Discussion" },
];

const CourseDetail = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  const handleReadmore = () => {
    setReadMore((prev) => !prev);
  };

 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await api.get<CoursesResponse>(`/courses/${id}`);
        setCourse(res.data.data.course);
        console.log("lessons", res.data.data.course);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* mobile section */}
      <section className="md:hidden">
        <div className="flex justify-center items-center h-70 bg-bg mb-4">
          {/* <p className="text-white font-bold text-3xl">{course?.code}</p> */}
          <img src={course?.thumbnail.url} alt={course?.title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">{course?.code}: {course?.title}</h2>
            <p className="text-muted ">{course?.lessons.length ?? 0} lessons</p>
          </div>

          
        </div>

        <div className="grid grid-cols-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                className={`py-4 transition-colors hover:cursor-pointer font-bold text-md ${
                  isActive
                    ? "text-text border-b-2 border-text"
                    : "text-muted"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
          {activeTab === "about" && course && (
            <About
              course={course}
              loading={loading}
              readMore={readMore}
              handleReadMore={handleReadmore}
            />
          )}

          {activeTab === "lessons" && (
            <Lessons
              lessons={course?.lessons || []}
              id={id}
            />
          )}

          {activeTab === "discussion" && <Discussions />}
        </div>
      </section>

      {/* desktop section */}
      <section className="hidden md:block">
        <Link
          to="/instructor/courses"
          className="text-muted flex gap-2 items-center w-fit mb-8"
        >
          <MoveLeft />
          <p className="text-sm">Back to Courses</p>
        </Link>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-bold text-2xl mb-2">{course?.title}</h1>
            <p className="text-text flex gap-2 text-sm mb-4 items-center">
              <NotebookText size={20} />
              <span>Module overview</span>
            </p>
          </div>
          
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
          <div>
          <h2 className="font-bold text-lg mb-4">About this course</h2>
          <p className={`text-muted bg-white p-4 ${readMore ? "" : "line-clamp-4"} rounded-2xl`}>
            {course?.description}
          </p>
          <button
            onClick={handleReadmore}
            className="font-bold text-sm cursor-pointer mt-2"
          >
            {readMore ? "Read less" : "Read more"}
          </button>
          </div>

          <div>
          <h2 className="font-bold text-lg mb-4 mt-8">Course Syllabus</h2>

          <div className="flex flex-col gap-4">
            {course?.lessons.map((lesson) => {
              const isOpen = openLessonId === lesson._id;

              return (
                <div
                  key={lesson._id}
                  className="bg-white py-4 px-6 shadow-sm rounded-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex gap-8 items-center">
                        <p className="font-bold text-muted">Week {lesson.order}</p>
                        <p className="font-bold">
                          {lesson.title || `Lecture ${lesson.order}`}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setOpenLessonId(prev => prev === lesson._id ? null : lesson._id)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                        >
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex text-sm items-center gap-2">
                          <Play
                            size={12}
                            className="text-white bg-bg p-1 w-5 h-5 rounded-full"
                          />
                          <p className="text-text">Available now</p>
                        </div>

                        <Link
                          to={`/student/${id}/lesson/${lesson._id}`}
                          className="bg-bg px-4 py-2 rounded-full text-white hover:bg-bg/90 hover:shadow-md transition-all duration-200"
                        >
                          Start lesson
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          </div>
          <div>
          <div className="bg-white p-6 flex flex-col gap-2 mt-16 rounded-2xl">
          <h2 className="font-bold text-lg">Course Syllabus</h2>
          <p className="text-muted">Join the community discussion for this course.</p>
          <Link to={''} className="bg-bg text-white flex justify-center rounded-full   items-center py-2  ">
              <p>Join forum</p>
          </Link>
          </div>
          <div className="bg-white p-6 flex flex-col gap-2 mt-16 rounded-2xl">
          <h2 className="font-bold text-lg">Course Instruction</h2>
          <div className="flex gap-2 mb-4">
            <Check className="bg-green-700 text-white rounded-full p-1 w-4 h-4"/>
            <p className="text-muted text-sm">Review all syllabus materials.</p>
            
          </div>
          <div className="flex gap-2 mb-4">
            <Check className="bg-green-700 text-white rounded-full p-1 w-4 h-4"/>
            <p className="text-muted text-sm">Watch video lessons completely.</p>
            
          </div>
          <div className="flex gap-2 mb-4">
            <Check className="bg-green-700 text-white rounded-full p-1 w-4 h-4"/>
            <p className="text-muted text-sm">Complete assignments on time.</p>
            
          </div>
          </div>
          </div>
        </div>
      </section>


    </>
  );
};

type AboutProps = {
  course: Course;
  loading: boolean;
  readMore: boolean;
  handleReadMore: () => void;
};

type LessonsProps = {
  lessons: Lesson[];
  id?: string;
};

const About = ({
  course,
  loading,
  readMore,
  handleReadMore,
}: AboutProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="font-bold mb-4 text-md">About this course</h3>
        <p className={`text-muted ${readMore ? "" : "line-clamp-4"}`}>
          {course.description}
        </p>
        <button
          onClick={handleReadMore}
          className="font-bold text-sm cursor-pointer"
        >
          {readMore ? "Read less" : "Read more"}
        </button>
      </div>

      <div>
        <div>
          <h4 className="font-bold text-sm text-text">Course Instructor</h4>
          <p className="text-muted">{course.instructor.name}</p>
          <p className="text-muted">{course.instructor.email}</p>
        </div>
      </div>
    </>
  );
};

const Lessons = ({ lessons, id }: LessonsProps) => {
  if (lessons.length === 0) {
    return (
      <div>
        <h1>No lessons yet</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="bg-slate-50 p-4 flex flex-col gap-4 rounded-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="font-bold text-2xl text-muted">{lesson.order}</p>
              <div>
                <h3 className="font-semibold text-sm">
                  {lesson.title || `Lecture ${lesson.order}`}
                </h3>
                <p className="text-sm text-muted">{lesson.type} lesson</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={id ? `/student/${id}/lesson/${lesson._id}` : "#"}
                className="rounded-full bg-bg px-3 py-2 text-sm font-medium text-white"
              >
                Open
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Discussions = () => {
  return (
    <>
      <div className="flex flex-col p-4 justify-center items-center text-muted">
        <MessageCircleMore size={40} />
        <h2 className="font-bold text-text text-lg mb-2">Coumminity forum</h2>
        <p className="text-sm text-center">Join the conversation, ask questions, and share ideas with other students.</p>

        <Link to={''} >
          <div className="text-white bg-bg flex justify-center items-center px-6 py-2 rounded-full mt-4 ">
            <p >Open forum</p>

          </div>
        </Link>

      </div>
    </>
  );
};




export default CourseDetail;