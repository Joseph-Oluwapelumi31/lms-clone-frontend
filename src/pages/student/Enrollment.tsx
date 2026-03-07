import {   Calendar, NotebookText, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

const Enrollment = () => {
  return (
    <section className="relative">
      {/*Title mobile section */}
      <div className=" md:hidden">
        <h1 className="text-text font-bold text-xl mb-2">Available Courses</h1>
        <p className="text-muted text-sm"> 2025/2026 • Harmattan Semester</p>
      </div>

        {/*Title desktop section */}
      <div className="md:block hidden">
        <h1 className="text-text font-bold text-xl mb-2">Explore Courses</h1>
        <p className="text-muted text-sm"> Discover new subjects and enroll for session 2025/2026 (Harmattan Semester)</p>
      </div>

      {/*Course cards md and lg section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:flex md:flex-col mt-4  bg-white rounded-xl gap-2   shadow-md hidden hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
          <div>
            <h3 className="font-bold h-30 rounded-2xl text-xl bg-bg text-white items-center flex justify-center">ENT211</h3>
          </div>
          <div className="p-4">
            <h3 className="text-text font-bold ">Entrepreneurship and innovation</h3>
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <NotebookText className="h-4 w-4 text-muted inline mr-2" />
                <span className="text-muted ">Added: Nov 11, 2025</span>
              </div>
            </div>
            <p className="text-sm text-muted mb-4 line-clamp-3">This course introduces students to the fundamental principles and practices of entrepreneurship and intrapreneurship. It explores how innovative ideas are transformed into viable business ventures, emphasizing opportunity identification, value creation, and risk management. Students will gain an in-depth understanding of entrepreneurial concepts, theories, and mindsets essential for starting and sustaining successful enterprises in today’s dynamic environment.</p>
            <button className="flex items-center w-full cursor-pointer justify-center border border-[#dc3545] text-[#dc3545] hover:text-white hover:bg-[#dc3545] p-2 rounded-full hover:-translate-y-1 hover:shadow-md transition-all duration-300">Enroll Now</button>
          </div>
        </div>
        <div className="md:flex md:flex-col mt-4  bg-white rounded-xl gap-2    shadow-md hidden hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
          <div>
            <h3 className="font-bold h-30 rounded-2xl text-xl bg-bg text-white items-center flex justify-center">GST111</h3>
          </div>
          <div className="p-4">
          <h3 className="text-text font-bold ">Communication in English</h3>
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <NotebookText className="h-4 w-4 text-muted inline mr-2" />
              <span className="text-muted ">Added: Nov 6, 2025</span>
            </div>
          </div>
          <p className="text-sm text-muted mb-4 line-clamp-3">This course introduces students to the fundamental principles and practices of entrepreneurship and intrapreneurship. It explores how innovative ideas are transformed into viable business ventures, emphasizing opportunity identification, value creation, and risk management. Students will gain an in-depth understanding of entrepreneurial concepts, theories, and mindsets essential for starting and sustaining successful enterprises in today’s dynamic environment.</p>
          <button className="flex items-center w-full cursor-pointer justify-center bg-bg text-white p-2 rounded-full hover:-translate-y-1 hover:shadow-md transition-all duration-300">Enroll Now</button>
      </div>
        </div>
        
        
      </div>


      {/*Course cards mobile section */}
      <div>
        <div className="flex justify-between items-center p-4 mt-8 bg-white rounded-xl gap-3 h-24 shadow-md">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="px-3 py-1 h-15 rounded-sm text-xs font-bold bg-bg text-white flex items-center justify-center">
            ENT211
          </div>

          <div className="min-w-0">
            <h3 className="font-bold truncate">
              Entrepreneurship and Innovation Development
            </h3>
            <p className="text-sm  md:block truncate">
               Enrolled
            </p>
          </div>
        </div>

        <Plus className="h-10 w-10 rounded-full cursor-pointer text-blue-500  bg-slate-50 p-2" />
      </div>  

      <div className="flex justify-between items-center p-4 mt-8 bg-white rounded-xl gap-3 h-24 shadow-md">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="px-3 py-1 h-15 rounded-sm text-xs font-bold bg-bg text-white flex items-center justify-center">
            ENT211
          </div>

          <div className="min-w-0">
            <h3 className="font-bold truncate">
              Communication in English 
            </h3>
            <p className="text-sm text-muted md:block truncate">
              Not Enrolled
            </p>
          </div>
        </div>

        <Trash2 className="h-9 w-9 rounded-full cursor-pointer hover:text-white hover:bg-red-500 text-red-500 border border-red-500 bg-slate-50 p-2" />
      </div>  
      </div>
      
      {/* Absolute CTA*/}
      <div className="absolute top-0 right-0 hidden md:block ">
        <div className="text-[#0d6efd] border border-[#0d6efd] flex items-center gap-1 px-4 py-2  font-medium rounded-full text-xs">
          <Calendar className="h-4 w-4 rounded-full"/>
          <p>Session: 2025/2026 (Harmattan)</p>
        </div>
        <Link to={'/courses'} className="flex items-center gap-1 mt-4 bg-white text-text px-4 py-2 rounded-full shadow-md hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300 ">
            <NotebookText className="h-6 w-6 rounded-full   cursor-pointer"/>
            <p>My Enrolled Courses</p>
        </Link>
      </div>

    </section>
  )
}

export default Enrollment