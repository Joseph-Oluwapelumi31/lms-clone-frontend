import { Outlet } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function AuthLayout() {
  return (
    <div className="lg:grid lg:grid-cols-2 ">
      <div className="hidden bg-[#22223E] text-white  lg:grid grid-rows-2 py-12 px-16 ">
        <div>
          <h2 className="text-2xl font-bold">YOKLMS</h2>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-[#ffffff] mb-8">
            
            <TypeAnimation
              sequence={[
                "Welcome to the Future of Learning! 🚀.",
                1500,
                "Welcome to the Future of Learning! 🚀.",
                1500,
                "Welcome to the Future of Learning! 🚀.",
                1500,
              ]}
              speed={55}
              repeat={Infinity}
              wrapper="span"
              cursor={true}
            />
          </h1>
          <p className="text-[#d1d5db] text-2xl">Join out community of students and mentors on the best lms platform.</p>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
}