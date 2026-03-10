import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type CreateCoursePayload = {
  title: string;
  description: string;
  isPublished: boolean
};

const CreateCourse = () => {
  const [formData, setFormData] = useState<CreateCoursePayload>({
    title: "",
    description: "",
    isPublished: false
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      const payload = {
        title: formData.title,
        description: formData.description,
      };

      const res = await api.post("/courses", payload);

      setSuccessMessage("Course created successfully.");
      console.log(res.data);

      setFormData({
        title: "",
        description: "",
        isPublished: false
      });
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Thumbnail
              </label>

              <div className="flex min-h-[140px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-slate-200 p-3 text-slate-700">
                    <ImagePlus size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    Thumbnail upload coming soon
                  </p>
                  <p className="text-xs text-slate-500">
                    You can add image upload after setting up file handling.
                  </p>
                </div>
              </div>
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
                onClick={() =>
                  setFormData({
                    title: "",
                    description: "",
                    isPublished: false
                  })
                }
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