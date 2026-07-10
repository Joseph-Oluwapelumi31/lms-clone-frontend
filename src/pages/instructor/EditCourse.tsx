import { ImagePlus, Loader2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom"
import { api } from "../../lib/api";
import { useState, useEffect } from "react";
import type{ Course } from "../../types/instructorDashboard";

type CoursesResponse = {
  data: {
    course: Course;
    enrollmentCount: number;
  }
};

type CreateCoursePayload = {
  title: string;
  description: string;
  code: string;
  isPublished: boolean
};

const EditCourse = () => {
  const [course, setCourse]= useState<Course | null>(null)

  const [formData, setFormData] = useState<CreateCoursePayload>({
    title: '',
    description: '',
    code: '',
    isPublished: false
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {user} = useAuth();

  const {id} = useParams();
  
  useEffect(()=>{
          try {
              const fetchCourse = async()=>{
                  const res = await api.get<CoursesResponse>(`/courses/${id}`)
                  setCourse(res.data.data.course)
                  console.log(res)
              }
              fetchCourse();
          } catch (error) {
              console.log('error' + error)
          };
          
  }, [id])

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title ?? "",
        description: course.description ?? "",
        code: course.code ?? "",
        isPublished: course.isPublished ?? ""
      });
    }
    }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!formData.title.trim()) {
        setErrorMessage("Course title is required.");
        setLoading(false);
        return;
      }
      if (!formData.description.trim()) {
        setErrorMessage("Course description is required.");
        setLoading(false);
        return;
      }
      if (formData.code && formData.code.length !== 6) {
        setErrorMessage("Course code must be exactly 6 characters.");
        setLoading(false);
        return;
      }

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      if (formData.code) {
        payload.append("code", formData.code);
      }
      payload.append("isPublished", formData.isPublished.toString());
      if (file) {
        payload.append("thumbnail", file);
      }

      const res = await api.patch(`/courses/${id}`, payload);

      setSuccessMessage("Course updated successfully.");
      console.log(res.data);

      setFile(null);
      if (!user) {
        return <Navigate to="/login" />;
      } 
      navigate("/instructor/courses");
      
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage(
         "Failed to update course."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Edit Course
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the course details to edit your course
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Course Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Write a short description for your course"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Course Code (6 characters)
              </label>
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter 6-character course code"
                value={formData.code}
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    handleChange(e);
                  }
                }}
                maxLength={6}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 uppercase"
              />
              <p className="mt-1 text-xs text-slate-500">
                {formData.code.length}/6 characters
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Thumbnail
              </label>

              <div className="flex min-h-35 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center cursor-pointer">
                <label htmlFor="thumbnail" className="flex flex-col items-center gap-2 cursor-pointer w-full">
                  <input 
                    id="thumbnail"
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="rounded-full bg-slate-200 p-3 text-slate-700">
                    <ImagePlus size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload new thumbnail
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG allowed
                  </p>
                </label>

                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="mt-3 rounded-lg w-32"
                  />
                )}
              </div>
              {course?.thumbnail && !file && (
                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-2">Current thumbnail:</p>
                  <img
                    src={course.thumbnail.url}
                    alt="current"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPublished: e.target.checked,
                  }))
                }
            />

              <label htmlFor="isPublished" className="text-sm font-medium">
                Publish Course
              </label>
            </div>

            {successMessage && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Edit Course"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: "",
                    description: "",
                    code: "",
                    isPublished: false
                  });
                  setFile(null);
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCourse;