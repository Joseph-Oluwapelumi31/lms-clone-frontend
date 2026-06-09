import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";

const Register = () => {
  const { register } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formErrors, setFormErrors] = useState({ name: "", email: "", password: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      errors.name = "Name is required.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password);
      nav("/login");
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error instanceof AxiosError && error.response) {
        const data = error.response.data as Record<string, unknown>;
        if (typeof data.message === "string") {
          message = data.message;
        } else if (data.error) {
          message = String(data.error);
        }
      }

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="lg:hidden text-2xl font-bold text-text mb-8">YOKLMS</h2>
          <h1 className="block lg:hidden text-2xl font-bold text-text mb-4">
            <TypeAnimation
              sequence={["Hi, Welcome Back!👏", 1500, "Hi, Welcome Back!👏", 1500]}
              speed={55}
              repeat={Infinity}
              wrapper="span"
              cursor={true}
            />
          </h1>
          <h1 className="lg:block hidden text-2xl font-bold text-text mb-4">
            Hi, Welcome Back!👏
          </h1>
          <p className="text-muted mb-8">Hello again, you've been missed!</p>

          <form onSubmit={submit} className="flex flex-col gap-4">
            {submitError && (
              <div className="rounded-xl bg-red-100 border border-red-200 text-red-700 p-3">
                {submitError}
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold mb-2 text-muted">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 rounded-xl p-4"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold mb-2 text-muted">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-xl p-4"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold mb-2 text-muted">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-xl p-4 text-text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me" className="font-bold text-muted">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-bg text-white font-bold rounded-xl shadow-xl h-12 cursor-pointer hover:bg-[#1a1a2e] p-2 mt-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-bg transition hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;