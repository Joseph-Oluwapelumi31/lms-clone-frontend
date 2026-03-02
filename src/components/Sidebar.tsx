import Logo from "./Logo"
import {Link} from "react-router-dom"
import { X ,LogOut , Heart ,MessageSquareMore ,Bell, GraduationCap, UserRound, NotebookText, Home,} from "lucide-react" 

type Props = {
    isOpen: boolean;
    closeSideBar: ()=> void;


}

const Sidebar = ({isOpen, closeSideBar}: Props) => {
  return (
    <>
    <div
      onClick={closeSideBar}
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
    />
  
    <aside
    className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white p-4
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:translate-x-0 lg:h-auto lg:w-auto lg:shadow-none`}
    >
        <X className="absolute top-4 right-4 hover:bg-muted/10 rounded-full p-2 w-10 h-10 cursor-pointer" onClick={closeSideBar} />
        <Logo />
        <nav className="mt-8">
            <ul className="flex flex-col gap-4">
                <li>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <Home className="w-5 h-5 inline mr-4 " />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <NotebookText className="w-5 h-5 inline mr-4 " />
                        <span>Courses</span>
                    </Link>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <Heart className="w-5 h-5 inline mr-4 " />
                        <span>Add Courses</span>
                    </Link>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <GraduationCap className="w-5 h-5 inline mr-4 " />
                        <span>Academics</span>
                    </Link>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <MessageSquareMore className="w-5 h-5 inline mr-4 " />
                        <span>Forums</span>
                    </Link>
                    <Link to="/" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <Bell className="w-5 h-5 inline mr-4 " />
                        <span>Notifications</span>
                    </Link>
                    <Link to="/profile" className="text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <UserRound className="w-5 h-5 inline mr-4 " />
                        <span>Profile</span>
                    </Link>
                    <Link to="/" className="text-[#dc3545] font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <LogOut className="w-5 h-5 inline mr-4 " />
                        <span>Logout</span>
                    </Link>
                </li> 
            </ul>  
        </nav>
    </aside>
    </>
  )
}

export default Sidebar