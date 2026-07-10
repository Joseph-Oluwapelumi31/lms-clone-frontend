import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type CreateCoursePayload = {
  title: string;
  description: string;
  code: string;
  isPublished: boolean
};

const CreateCourse = () => {
  const [formData, setFormData] = useState<CreateCoursePayload>({
    title: "",
    description: "",
    code: "",
    isPublished: false
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const {user} = useAuth();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      if (!formData.code.trim() || formData.code.length !== 6) {
        setErrorMessage("Course code must be exactly 6 characters.");
        setLoading(false);
        return;
      }
      if (!file) {
        setErrorMessage("Thumbnail is required.");
        setLoading(false);
        return;
      }

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("code", formData.code);
      payload.append("thumbnail", file);

      const res = await api.post("/courses", payload);

      setSuccessMessage("Course created successfully.");
      console.log(res.data);

      setFormData({
        title: "",
        description: "",
        code: "",
        isPublished: false
      });
      setFile(null);
      if (!user) {
        return <Navigate to="/login" />;
      } 
      navigate("/instructor/courses");
      
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage(
         "Failed to create course."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Create Course
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the course details to create a new course.
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
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
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
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 uppercase"
              />
              <p className="mt-1 text-xs text-slate-500">
                {formData.code.length}/6 characters
              </p>
            </div>

            <div className={`flex min-h-35 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center cursor-pointer`}>
              <label htmlFor="thumbnail" className="flex flex-col items-center gap-2 cursor-pointer w-full">

                <input 
                  id="thumbnail"
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />

                <div className="rounded-full bg-slate-200 p-3 text-slate-700">
                  <ImagePlus size={20} />
                </div>

                <p className="text-sm font-medium text-slate-700">
                  Click to upload thumbnail
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
                  "Create Course"
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

export default CreateCourse;