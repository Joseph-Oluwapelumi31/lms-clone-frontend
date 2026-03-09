import { Outlet } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <div className="hidden bg-[#22223E] text-white lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-12">
        <div>
          <h2 className="text-2xl font-bold tracking-wide">YOKLMS</h2>
        </div>

        <div className="max-w-xl">
          <h1 className="mb-8 text-5xl font-bold leading-tight text-white">
            <TypeAnimation
              sequence={[
                "Welcome to the Future of Learning! 🚀",
                1500,
                "Learn Smarter. Teach Better. Grow Faster. 📘",
                1500,
                "Your journey starts here. 🌍",
                1500,
              ]}
              speed={55}
              repeat={Infinity}
              wrapper="span"
              cursor={true}
            />
          </h1>

          <p className="text-xl leading-8 text-slate-300">
            Join our community of students and instructors on a modern learning
            platform built for growth, focus, and opportunity.
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Built for students, instructors, and admins.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}