import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import { useState, useEffect, type ReactNode } from "react";
import type { Course, Lesson } from "../../types/instructorDashboard";
import { Play, NotebookText, MoveLeft, ChevronDown, Check, MessageCircleMore, PlusCircle, Trash2, Edit3, X, Loader2 } from "lucide-react";

type CoursesResponse = {
  data: {
    course: Course;
    enrollmentCount: number;
  };
};

type LessonsResponse = {
  data: Lesson[];
};

type LessonForm = {
  title: string;
  type: "text" | "video" | "image" | "pdf";
  content: string;
  mediaUrl: string;
  thumbnailUrl: string;
  duration: string;
  order: string;
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

const initialLessonForm: LessonForm = {
  title: "",
  type: "text",
  content: "",
  mediaUrl: "",
  thumbnailUrl: "",
  duration: "",
  order: "",
};

const CourseDetail = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [readMore, setReadMore] = useState(false);
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonForm, setLessonForm] = useState<LessonForm>(initialLessonForm);
  const [modalError, setModalError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleReadmore = () => {
    setReadMore((prev) => !prev);
  };

  const resetLessonForm = () => {
    setLessonForm(initialLessonForm);
    setModalError("");
    setSelectedLesson(null);
    setIsEditMode(false);
  };

  const openCreateLessonModal = () => {
    resetLessonForm();
    setIsLessonModalOpen(true);
  };

  const openEditLessonModal = (lesson: Lesson) => {
    setIsEditMode(true);
    setSelectedLesson(lesson);
    setLessonForm({
      title: lesson.title,
      type: lesson.type,
      content: lesson.content ?? "",
      mediaUrl: lesson.mediaUrl ?? "",
      thumbnailUrl: lesson.thumbnailUrl ?? "",
      duration: lesson.duration?.toString() ?? "",
      order: lesson.order?.toString() ?? "",
    });
    setModalError("");
    setIsLessonModalOpen(true);
  };

  const handleLessonFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLessonForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeLessonModal = () => {
    setIsLessonModalOpen(false);
    resetLessonForm();
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setConfirmDeleteId(lesson._id);
    setIsConfirmOpen(true);
  };

  const confirmDeleteLesson = async () => {
    if (!confirmDeleteId) {
      return;
    }

    try {
      setModalLoading(true);
      await api.delete(`/lessons/${confirmDeleteId}`);
      setLessons((prev) => prev.filter((lesson) => lesson._id !== confirmDeleteId));
    } catch (error) {
      console.error(error);
      setModalError("Could not delete lesson. Please try again.");
    } finally {
      setModalLoading(false);
      setIsConfirmOpen(false);
      setConfirmDeleteId(null);
    }
  };

  const handleLessonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setModalError("Course ID is missing.");
      return;
    }

    if (!lessonForm.title.trim()) {
      setModalError("Lesson title is required.");
      return;
    }

    if (lessonForm.type === "text" && !lessonForm.content.trim()) {
      setModalError("Text lessons require content.");
      return;
    }

    if (lessonForm.type !== "text" && !lessonForm.mediaUrl.trim()) {
      setModalError(`${lessonForm.type} lessons require a media URL.`);
      return;
    }

    const payload: Record<string, unknown> = {
      title: lessonForm.title,
      type: lessonForm.type,
      order: lessonForm.order ? Number(lessonForm.order) : undefined,
    };

    if (lessonForm.type === "text") {
      payload.content = lessonForm.content;
    } else {
      payload.mediaUrl = lessonForm.mediaUrl;
    }

    if (lessonForm.thumbnailUrl.trim()) {
      payload.thumbnailUrl = lessonForm.thumbnailUrl;
    }

    if (lessonForm.duration.trim()) {
      payload.duration = Number(lessonForm.duration);
    }

    try {
      setModalLoading(true);
      setModalError("");

      const response = isEditMode && selectedLesson
        ? await api.patch(`/lessons/${selectedLesson._id}`, payload)
        : await api.post(`/lessons/course/${id}`, payload);

      const lesson = response.data.data as Lesson;
      setLessons((prev) => {
        const nextLessons = isEditMode
          ? prev.map((current) => (current._id === lesson._id ? lesson : current))
          : [...prev, lesson];
        return nextLessons.sort((a, b) => a.order - b.order);
      });

      closeLessonModal();
    } catch (error) {
      console.error(error);
      setModalError(
        isEditMode
          ? "Unable to update lesson. Please check your entries and try again."
          : "Unable to create lesson. Please check your entries and try again."
      );
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggleLecture = (lessonId: string) => {
    setOpenLessonId((prev) => (prev === lessonId ? null : lessonId));
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await api.get<CoursesResponse>(`/courses/${id}`);
        setCourse(res.data.data.course);
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

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get<LessonsResponse>(`/lessons/course/${id}`);
        setLessons(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (id) {
      fetchLessons();
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
            <p className="text-muted ">{lessons.length} lessons</p>
          </div>

          <button
            type="button"
            onClick={openCreateLessonModal}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            <PlusCircle size={18} />
            Add Lesson
          </button>
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
              lessons={lessons}
              id={id}
              onEdit={openEditLessonModal}
              onDelete={handleDeleteLesson}
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
          <button
            type="button"
            onClick={openCreateLessonModal}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 w-fit"
          >
            <PlusCircle size={18} />
            Add Lesson
          </button>
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
            {lessons.map((lesson) => {
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
                          onClick={() => openEditLessonModal(lesson)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLesson(lesson)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleLecture(lesson._id)}
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
                          to={`/instructor/${id}/lesson/${lesson._id}`}
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

      <LessonFormModal
        isOpen={isLessonModalOpen}
        onClose={closeLessonModal}
        onSubmit={handleLessonSubmit}
        formData={lessonForm}
        onChange={handleLessonFormChange}
        isLoading={modalLoading}
        error={modalError}
        isEditMode={isEditMode}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
          setConfirmDeleteId(null);
        }}
        onConfirm={confirmDeleteLesson}
        isLoading={modalLoading}
      />
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
  onEdit?: (lesson: Lesson) => void;
  onDelete?: (lesson: Lesson) => void;
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

const Lessons = ({ lessons, id, onEdit, onDelete }: LessonsProps) => {
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
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(lesson)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(lesson)}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  Delete
                </button>
              )}
              <Link
                to={id ? `/instructor/${id}/lesson/${lesson._id}` : "#"}
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

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const LessonFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isLoading,
  error,
  isEditMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: LessonForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  isLoading: boolean;
  error: string;
  isEditMode: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Lesson" : "Create Lesson"}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Lesson Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Order</label>
            <input
              name="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              min="0"
              value={formData.duration}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
            />
          </div>
        </div>

        {formData.type === "text" ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={onChange}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
            />
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Media URL</label>
            <input
              name="mediaUrl"
              type="text"
              value={formData.mediaUrl}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Thumbnail URL (optional)</label>
          <input
            name="thumbnailUrl"
            type="text"
            value={formData.thumbnailUrl}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-slate-500"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create Lesson"
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

const ConfirmDeleteModal = ({
  isOpen,
  onCancel,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Lesson">
      <div className="space-y-6">
        <p>Are you sure you want to delete this lesson? This action cannot be undone.</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-70"
          >
            {isLoading ? "Deleting..." : "Delete Lesson"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseDetail;