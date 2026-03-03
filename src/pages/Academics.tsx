import { Calendar,NotebookText, Trophy, UserRoundCheck  } from "lucide-react"
import { Link } from "react-router-dom"

const Academics = () => {
  return (
    <section>
      <div className="lg:hidden">
        <h1 className="text-text font-bold text-xl mb-2">Academics</h1>
        <p className="text-muted text-sm mb-8">Manage your academic activities and records</p>
      </div>

      <div className="hidden lg:block">
        <h1 className="text-text font-bold text-xl mb-2">Academic Hub</h1>
        <p className="text-muted text-sm mb-8">Centralized access to all your academic tools and records.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/assignment" >
          <div className="bg-white flex flex-col gap-4 p-2 justify-center items-center rounded-sm shadow-sm hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
            <div className="p-4 rounded-full bg-[#EE5253]">
              <NotebookText className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-text font-bold text-lg md:text-xl mb-2">Assignment</h2>
          </div>        
        </Link>
        
        <Link to="/assignment" >
          <div className="bg-white flex flex-col gap-4 p-2 justify-center items-center rounded-sm shadow-sm hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
            <div className="p-4 rounded-full bg-[#4ECDC4]">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-text font-bold text-lg md:text-xl mb-2">Assignment</h2>
          </div>        
        </Link>
        <Link to="/assignment" >
          <div className="bg-white flex flex-col gap-4 p-2 justify-center items-center rounded-sm shadow-sm hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
            <div className="p-4 rounded-full bg-[#A8E6CF]">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-text font-bold text-lg md:text-xl mb-2">Assignment</h2>
          </div>        
        </Link>
        <Link to="/assignment" >
          <div className="bg-white flex flex-col gap-4 p-2 justify-center items-center rounded-sm shadow-sm hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
            <div className="p-4 rounded-full bg-gradient-to-br from-[#FF9F43] to-[#FF6B6B]">
              <UserRoundCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-text font-bold text-lg md:text-xl mb-2">Assignment</h2>
          </div>        
        </Link>
      </div>
    </section>
  )
}

export default Academics