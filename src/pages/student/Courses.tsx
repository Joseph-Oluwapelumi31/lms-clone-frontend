import { ChevronRight, CirclePlus,  NotebookText,  SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

const Courses = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-text font-bold text-xl mb-2">My Courses</h1>
          <p className="text-sm">1 Active Subscription</p>
        </div>
        <div className="flex md:hidden items-center gap-2 mt-4">
          <Link to={'/enrollment'}>
            <CirclePlus className="h-10 w-10 rounded-full p-2 bg-white hover:text-blue-500 cursor-pointer"/>
          
          </Link>
        </div>
        <div className="hidden md:block bg-bg text-white px-4 py-2 rounded-full hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300 ">
          <Link to={'/enrollment'} className="flex justify-center items-center gap-1">
            <CirclePlus className="h-6 w-6 rounded-full   cursor-pointer"/>
            <p>Enroll</p>

          </Link>
        </div>
      </div>

      <div className="mt-6 relative w-full md:hidden ">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />

        <input
          type="text" 
          placeholder="Search courses..."
          className="placeholder:text-muted text-md w-full pl-12 pr-4 py-4 bg-white rounded-full focus:outline-none"
        />
      </div>

      <div className="flex md:hidden justify-between items-center p-4 mt-8 bg-white rounded-xl gap-3 h-24 shadow-md">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="px-3 py-1 h-15 rounded-sm text-xs font-bold bg-bg text-white flex items-center justify-center">
            ENT211
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold truncate">
              Entrepreneurship and Innovation Development
            </h3>
            <p className="text-sm text-muted  md:block truncate">
              This course introduces students to entrepreneurship and innovation development.
            </p>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-muted" />
      </div>

      <div className="md:flex md:flex-col mt-4  bg-white rounded-xl gap-2   h-80 w-80 shadow-md hidden hover:shadow-md hover:-translate-y-1  transition-all cursor-pointer duration-300">
          <div>
            <h3 className="font-bold h-30 rounded-2xl text-xl bg-bg text-white items-center flex justify-center">ENT211</h3>
          </div>
          <div className="p-4">
          <h3 className="text-text font-bold mb-4 ">Entrepreneurship and innovation</h3>
          <p className="text-sm text-muted mb-4 truncate">This course introduces students to the fundamental principles and practices of entrepreneurship and intrapreneurship. It explores how innovative ideas are transformed into viable business ventures, emphasizing opportunity identification, value creation, and risk management. Students will gain an in-depth understanding of entrepreneurial concepts, theories, and mindsets essential for starting and sustaining successful enterprises in today’s dynamic environment.</p>
          <div className="flex justify-between items-center">
            <div>
              <NotebookText className="h-4 w-4 text-muted inline mr-2" />
              <span className="text-muted text-sm ">Nov 11</span>
            </div>
            <Link to={'/courses'} className="bg-blue-500 text-white px-4 py-2 rounded-full">Continue</Link>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Courses