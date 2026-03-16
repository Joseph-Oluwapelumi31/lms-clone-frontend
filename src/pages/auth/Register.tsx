import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type LocationState = {
  from?: {
    pathname: string;
  };
};

const Login = () => {
  const {register} = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const from = (location.state as LocationState)?.from?.pathname || 'dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const submit = async (e: React.FormEvent) =>{
    e.preventDefault();
    await register(name,email, password,)
    nav(from, {replace:true})
  }

  return (
    <>
    <div className=" flex justify-center  h-screen p-8">
      <div className="w-full max-w-md ">
        <h2  className="lg:hidden text-2xl font-bold text-text mb-8">YOKLMS</h2>
        <h1 className="block lg:hidden text-2xl font-bold text-text mb-4">
          
          <TypeAnimation
              sequence={[
                "Hi, Welcome Back!👏",
                1500,
                "Hi, Welcome Back!👏",
                1500,
                
              ]}
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

        <form onSubmit= {submit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              
              <label htmlFor="name" className="font-bold mb-2 text-muted">Name</label>
              <input 
              type="text"
                id="name"
                className="border border-gray-300 rounded-xl p-4" name="matric-number"
                placeholder="Enter Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
          <div className="flex flex-col">
            
            <label htmlFor="email" className="font-bold mb-2 text-muted">Email</label>
            <input 
            type="email"
              id="email"
              className="border border-gray-300 rounded-xl p-4" name="matric-number"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold mb-2 text-muted">Password</label>
            <input
             type="password"
              id="password"
              className="border border-gray-300 rounded-xl p-4  text-text" name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />
          </div>

          <div className="flex gap-1">
            <input type="checkbox" id="remember-me" name="remember-me" />
            <label htmlFor="remember-me" className="font-bold  text-muted">Remember me</label>
          </div>
          <button type="submit" className=" bg-bg text-white font-bold rounded-xl shadow-xl h-12 cursor-pointer hover:bg-[#1a1a2e] p-2 mt-4">Register</button>
        </form>
      </div>
    </div>
      
    </>
  )
}

export default Login