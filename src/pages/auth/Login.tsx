import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/user";

const roleRedirect: Record<UserRole, string> = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  admin: "/admin/dashboard",
};

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const user = await login(email, password);
      nav(roleRedirect[user.role as UserRole], { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
      <h2 className="mb-6 text-2xl font-bold text-text lg:hidden">YOKLMS</h2>

      <h1 className="mb-3 text-2xl font-bold text-text lg:hidden">
        <TypeAnimation
          sequence={["Hi, Welcome Back! 👏", 1500, "Ready to continue? 🚀", 1500]}
          speed={55}
          repeat={Infinity}
          wrapper="span"
          cursor={true}
        />
      </h1>

      <h1 className="mb-3 hidden text-3xl font-bold text-text lg:block">
        Welcome back
      </h1>

      <p className="mb-8 text-muted">Login to continue your learning journey.</p>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Matric Number / Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-text outline-none transition focus:border-bg focus:ring-2 focus:ring-bg/20"
            placeholder="Enter matric number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-text outline-none transition focus:border-bg focus:ring-2 focus:ring-bg/20"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="h-4 w-4 rounded border-slate-300"
              disabled={loading}
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm font-medium text-bg hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-bg px-4 font-bold text-white shadow-lg transition hover:bg-[#1a1a2e] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-bg transition hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;