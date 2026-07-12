import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import type { Lesson } from '../../types/instructorDashboard';
import { Check, Download, Lock, Loader2, Pencil, Trash2, Zap } from 'lucide-react';
import Instruction from '../../components/Instruction'

type LessonResponse = {
  data: Lesson;
};
type Tab = {
  key: string ; label: string
}
const tabs: Tab[] = [
  {key: 'overview', label: 'Overview'},
  {key: 'instruction', label: 'Instructions'}
]

const LessonDetail = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("instruction");
  const [isDeleting, setIsDeleting] = useState(false);
  const lessonMediaUrl = lesson?.media?.url ?? lesson?.mediaUrl;

  const getTypeBadgeClasses = () => {
    switch (lesson?.type) {
      case "video":
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "image":
        return "border-amber-200 bg-amber-50 text-amber-700";
      case "pdf":
        return "border-rose-200 bg-rose-50 text-rose-700";
      default:
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.replace("www.", "");

      if (hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }

      if (hostname.includes("youtube.com")) {
        const videoId = parsed.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsed.pathname.startsWith("/embed/")) {
          return url;
        }
      }
    } catch {
      // fall through to raw URL
    }

    return url;
  };

  const renderLessonMedia = () => {
    if (!lesson || !lessonMediaUrl) {
      return null;
    }

    if (lesson.type === "video") {
      const isYouTube = /(?:youtu\.be|youtube\.com)/i.test(lessonMediaUrl);
      return isYouTube ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <iframe
            src={getYoutubeEmbedUrl(lessonMediaUrl)}
            title={lesson.title || "Lesson video"}
            className="h-70 w-full md:h-105"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <video
            controls
            className="w-full rounded-2xl"
            src={lessonMediaUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (lesson.type === "image") {
      return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <img
            src={lessonMediaUrl}
            alt={lesson.title || "Lesson image"}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      );
    }

    if (lesson.type === "pdf") {
      return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <iframe
            src={lessonMediaUrl}
            title={lesson.title || "Lesson PDF"}
            className="w-full min-h-105"
          />
        </div>
      );
    }

    return null;
  };

  const renderLessonOverview = () => {
    if (!lesson) return null;

    if (lesson.type === "text") {
      return (
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-muted whitespace-pre-line leading-7">{lesson.content || "No lesson content available."}</p>
        </div>
      );
    }

    if (lessonMediaUrl) {
      return (
        <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-700">Lesson resource</p>
          <p className="text-muted">Open the attached material for this lesson.</p>
          <a href={lessonMediaUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">Open resource</a>
        </div>
      );
    }

    return <p className="text-muted">No preview available for this lesson type.</p>;
  };

  const handleDeleteLesson = async () => {
    if (!lessonId || !lesson) {
      return;
    }

    const confirmed = window.confirm(`Delete "${lesson.title}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      await api.delete(`/lessons/${lessonId}`);
      navigate(`/instructor/courses/${courseId}`);
    } catch (deleteError) {
      console.error('Failed to delete lesson', deleteError);
      setError('Could not delete this lesson. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!lessonId) {
      setError('Lesson ID is missing in URL.');
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await api.get<LessonResponse>(`/lessons/${lessonId}`);
        setLesson(res.data.data);
      } catch (err) {
        console.error('Failed to fetch lesson', err);
        setError('Could not load lesson. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  return (
    <section className="min-h-screen bg-slate-50 px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl">
        {lessonMediaUrl && (
          <div className="mb-4 lg:hidden">
            {renderLessonMedia()}
          </div>
        )}

        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:hidden">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Lecture {lesson?.order}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{lesson?.title}</h2>
            </div>
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getTypeBadgeClasses()}`}>
              {lesson?.type}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Lock size={15} className="text-slate-500" />
              <p>Attendance Locked</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <Zap size={15} className="text-slate-500" />
              <p>Quiz</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  className={`rounded-2xl py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-500"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {loading && <p className="mt-4 text-center text-muted">Loading lesson...</p>}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          {!loading && !error && !lesson && <p className="mt-4 text-center text-muted">Lesson not found.</p>}

          {activeTab === "instruction" && <Instruction bg="bg-slate-50" />}
          {activeTab === "overview" && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <h2 className="mb-3 text-lg font-bold text-slate-900">Description</h2>
              <p className="text-muted whitespace-pre-line leading-7">{lesson?.content || "No lesson content available."}</p>
            </div>
          )}
        </div>

        <div className="hidden gap-4 md:grid lg:grid-cols-3">
          <div className="lg:col-span-2">
            {lessonMediaUrl && (
              <div className="mb-4">
                {renderLessonMedia()}
              </div>
            )}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900">About this lesson</h2>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getTypeBadgeClasses()}`}>
                  {lesson?.type}
                </span>
              </div>
              {renderLessonOverview()}
            </div>
          </div>

          <div>
            <div className="my-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-4 text-xl font-bold text-slate-900">{lesson?.title}</h2>
              <div className="flex flex-col gap-3">
                <Link to={`/instructor/${courseId}/lesson/${lessonId}/edit`}>
                  <div className="flex items-center justify-center gap-2 rounded-full border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    <Pencil className="h-4 w-4" />
                    <p>Edit Lesson</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={handleDeleteLesson}
                  disabled={isDeleting}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>Deleting...</p>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <p>Delete Lesson</p>
                    </>
                  )}
                </button>
                <Link to={""}>
                  <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-50 py-3 text-sm font-semibold text-emerald-700">
                    <Check className="h-5 w-5 rounded-full bg-emerald-700 p-0.5 text-white" />
                    <p>Attendance Marked</p>
                  </div>
                </Link>
                <Link to={""}>
                  <div className="flex items-center justify-center gap-2 rounded-full border border-blue-600 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                    <Zap className="h-4 w-4" />
                    <p>Take Quiz</p>
                  </div>
                </Link>
                <Link to={""}>
                  <div className="flex items-center justify-center gap-2 rounded-full border border-slate-300 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-900 hover:text-white">
                    <Download className="h-4 w-4" />
                    <p>Lesson Resources</p>
                  </div>
                </Link>
              </div>
            </div>

            <Instruction bg="bg-white" />
          </div>
        </div>
      </div>
    </section>
    
    
  );
};


export default LessonDetail;
