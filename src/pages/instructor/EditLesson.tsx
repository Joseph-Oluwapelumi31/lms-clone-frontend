import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ImagePlus,
  Loader2,
  NotebookPen,
  PlayCircle,
  UploadCloud,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import type { Course, Lesson } from "../../types/instructorDashboard";

type LessonType = "text" | "video" | "image" | "pdf";

type LessonFormState = {
  title: string;
  type: LessonType;
  content: string;
  duration: string;
  order: string;
};

type CourseResponse = {
  data: {
    course: Course;
  };
};

type LessonResponse = {
  data: Lesson;
};

const lessonTypeOptions: Array<{
  value: LessonType;
  label: string;
  description: string;
  icon: typeof FileText;
}> = [
  {
    value: "text",
    label: "Text",
    description: "Use notes, instructions, and lesson guidance.",
    icon: NotebookPen,
  },
  {
    value: "video",
    label: "Video",
    description: "Upload a lecture video file for students.",
    icon: PlayCircle,
  },
  {
    value: "image",
    label: "Image",
    description: "Attach slides or visual lesson material.",
    icon: ImagePlus,
  },
  {
    value: "pdf",
    label: "PDF",
    description: "Publish a downloadable worksheet or handout.",
    icon: FileText,
  },
];

const EditLesson = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<LessonFormState>({
    title: "",
    type: "text",
    content: "",
    duration: "",
    order: "",
  });

  const isMediaLesson = formData.type === "video" || formData.type === "image" || formData.type === "pdf";

  const previewUrl = useMemo(() => {
    if (!file) {
      return "";
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setErrorMessage("Course route is missing.");
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const response = await api.get<CourseResponse>(`/courses/${courseId}`);
        setCourse(response.data.data.course);
      } catch (error) {
        console.error("Could not fetch course", error);
        setErrorMessage("Unable to load your course details right now.");
      } finally {
        setInitialLoading(false);
      }
    };

    const fetchLesson = async () => {
      if (!lessonId) {
        setErrorMessage("Lesson route is missing.");
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const response = await api.get<LessonResponse>(`/lessons/${lessonId}`);
        const lessonData = response.data.data;

        setLesson(lessonData);
        setFormData({
          title: lessonData.title ?? "",
          type: lessonData.type ?? "text",
          content: lessonData.content ?? "",
          duration: lessonData.duration ? String(lessonData.duration) : "",
          order: lessonData.order ? String(lessonData.order) : "",
        });
      } catch (error) {
        console.error("Could not fetch lesson", error);
        setErrorMessage("Unable to load the lesson details right now.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }

    if (lessonId) {
      fetchLesson();
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const selectedType = lessonTypeOptions.find((option) => option.value === formData.type) ?? lessonTypeOptions[0];

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (type: LessonType) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
  };

  const resetForm = () => {
    if (!lesson) {
      return;
    }

    setFormData({
      title: lesson.title ?? "",
      type: lesson.type ?? "text",
      content: lesson.content ?? "",
      duration: lesson.duration ? String(lesson.duration) : "",
      order: lesson.order ? String(lesson.order) : "",
    });
    setFile(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lessonId) {
      setErrorMessage("Lesson route is missing.");
      return;
    }

    const cleanedTitle = formData.title.trim();
    const cleanedContent = formData.content.trim();
    const numericDuration = Number(formData.duration);
    const numericOrder = Number(formData.order);

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!cleanedTitle) {
        setErrorMessage("Lesson title is required.");
        return;
      }

      if (formData.type === "text" && !cleanedContent) {
        setErrorMessage("Text lessons need content before they can be saved.");
        return;
      }

      if (formData.duration && Number.isNaN(numericDuration)) {
        setErrorMessage("Lesson duration must be a number of minutes.");
        return;
      }

      if (formData.order && Number.isNaN(numericOrder)) {
        setErrorMessage("Lesson order must be a valid number.");
        return;
      }

      const payload = {
        title: cleanedTitle,
        type: formData.type,
        content: cleanedContent || undefined,
        duration: formData.duration ? numericDuration : undefined,
        order: formData.order ? numericOrder : undefined,
      };

      await api.patch(`/lessons/${lessonId}`, payload);

      setSuccessMessage("Lesson updated successfully.");
      navigate(`/instructor/${courseId}/lesson/${lessonId}`);
    } catch (error: unknown) {
      console.error("Failed to update lesson", error);
      setErrorMessage("Something went wrong while updating the lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const lessonSummary =
    formData.type === "text"
      ? "Students will read the lesson content directly on the platform."
      : `Students will be guided through a ${formData.type} lesson resource.`;

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <Link
          to={`/instructor/courses/${courseId ?? ""}`}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to course
        </Link>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Instructor workspace
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Edit lesson
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {initialLoading
                ? "Loading lesson details..."
                : `Update the lesson content for ${course?.title ?? "your course"}.`}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Course</p>
            <p className="text-sm font-semibold text-slate-900">
              {course?.code ? `${course.code} • ` : ""}
              {course?.title ?? "Loading..."}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
                  Lesson title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter lesson title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Lesson type
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lessonTypeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = formData.type === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleTypeChange(option.value)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          isActive
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Icon size={16} />
                          <span className="text-sm font-semibold">{option.label}</span>
                        </div>
                        <p className={`text-xs ${isActive ? "text-slate-200" : "text-slate-500"}`}>
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formData.type === "text" && (
                <div>
                  <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-700">
                    Lesson content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={8}
                    value={formData.content}
                    onChange={handleFieldChange}
                    placeholder="Write the lesson notes, instructions, or key takeaways here..."
                    className="w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
                  />
                </div>
              )}

              {isMediaLesson && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Upload {selectedType.label.toLowerCase()} media
                  </label>
                  <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
                    <label
                      htmlFor="lesson-file"
                      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center"
                    >
                      <div className="rounded-full bg-slate-900 p-3 text-white">
                        <UploadCloud size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Click to replace the existing file</p>
                        <p className="mt-1 text-xs text-slate-500">
                          The current API stores the original media asset. This upload is kept for future media replacement support.
                        </p>
                      </div>
                      <input id="lesson-file" type="file" className="hidden" onChange={handleFileChange} />
                    </label>

                    {file && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{file.name}</p>
                            <p className="text-xs text-slate-500">{Math.max(1, Math.round(file.size / 1024))} KB</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                        >
                          <X size={14} />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="duration" className="mb-2 block text-sm font-medium text-slate-700">
                    Duration (minutes)
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    min="0"
                    value={formData.duration}
                    onChange={handleFieldChange}
                    placeholder="Optional"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="order" className="mb-2 block text-sm font-medium text-slate-700">
                    Lesson order
                  </label>
                  <input
                    id="order"
                    name="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={handleFieldChange}
                    placeholder="Optional"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-slate-900 p-2 text-white">
                  <NotebookPen size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Lesson preview</h2>
                  <p className="text-xs text-slate-500">{lessonSummary}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">{formData.title || "Untitled lesson"}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{selectedType.label} lesson</p>
              </div>

              {formData.type === "text" && formData.content && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  {formData.content.slice(0, 200)}
                  {formData.content.length > 200 ? "..." : ""}
                </div>
              )}

              {isMediaLesson && previewUrl && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  {formData.type === "image" ? (
                    <img src={previewUrl} alt="Lesson preview" className="h-48 w-full rounded-xl object-cover" />
                  ) : (
                    <video src={previewUrl} controls className="h-48 w-full rounded-xl bg-black object-cover" />
                  )}
                </div>
              )}

              {lesson?.media?.url && !previewUrl && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Existing attached media is already stored for this lesson.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
              <h2 className="text-base font-bold">Publishing checklist</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-300" />
                  Keep the title and description clear for students.
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-300" />
                  Update text lessons when you want to refine the notes or instructions.
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-300" />
                  Use the order field to keep the syllabus flow consistent.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EditLesson;