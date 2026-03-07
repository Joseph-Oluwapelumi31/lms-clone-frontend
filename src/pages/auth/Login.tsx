import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
      nav(roleRedirect[user.role as UserRole], { replace: true });
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="flex justify-center h-screen p-8">
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
          <div className="flex flex-col">
            <label htmlFor="matric-number" className="font-bold mb-2 text-muted">
              Matric Number
            </label>
            <input
              type="text"
              id="matric-number"
              name="matric-number"
              className="border border-gray-300 rounded-xl p-4"
              placeholder="Enter Matric Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold mb-2 text-muted">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-xl p-4 text-text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex gap-1">
            <input type="checkbox" id="remember-me" name="remember-me" />
            <label htmlFor="remember-me" className="font-bold text-muted">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-bg text-white font-bold rounded-xl shadow-xl h-12 cursor-pointer hover:bg-[#1a1a2e] p-2 mt-4 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;