import { MessageCircleMore, NotebookText, MoveRight } from "lucide-react"
import { Link } from "react-router-dom"

const Forum = () => {
  return (
    <section className="hover:-translate-y-1 hover:shadow-md transition-all duration-300 lg:w-80">
      <div className="">
        <h1 className="text-text font-bold text-xl mb-2">Class Forum</h1>
        <p className="text-muted text-sm mb-8">Join discussions with your classmates</p>
      </div>
      <div className="bg-white flex flex-col gap-4 p-6 rounded-2xl shadow-sm  h-70">
        <div className="flex justify-between ">
          <div className="bg-slate-50 p-2 rounded-full">
            <MessageCircleMore className="text-text" />
          </div>
          <p className="text-muted text-xs bg-slate-50 px-2 py-1 h-5 flex justify-center items-center border border-muted rounded-sm">ENT211</p>
        </div>
         <div className="">
          <h2 className="text-text font-bold text-lg md:text-xl mb-2">ENT 211 Forum</h2>
          <div>
            <NotebookText className="h-4 w-4 text-muted inline mr-2" />
            <span className="text-muted text-sm ">Entrepreneurship and Innovation</span>
          </div>
          <p className="text-muted text-sm mb-8 mt-4"> Entrepreneurship and Innovation Discussion Room</p>
          
          <Link to="/forum/ent211" className=" text-[#0d6efd] border border-[#0d6efd] hover:bg-[#0d6efd] hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex justify-center items-center  px-4 py-2 text-sm font-medium rounded-full gap-2">
            <MoveRight className="h-4 w-4" />
            <p className="mr-2">Go to Forum</p>
          </Link>
        </div>
      </div>  
    </section>
  )
}

export default Forum