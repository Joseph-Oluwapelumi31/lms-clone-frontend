import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const NotFound = () => {
  const { user } = useAuth()

  const home =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "instructor"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>

        <Helmet>
          <title>404 - Page Not Found</title>
        </Helmet>

        <p className="text-muted mb-6">
          Sorry, the page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to={home}
            className="px-5 py-2 rounded-lg bg-bg text-white hover:opacity-90 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-lg border border-muted text-text hover:bg-muted/10 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

