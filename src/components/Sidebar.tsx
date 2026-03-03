import Logo from "./Logo"
import {NavLink} from "react-router-dom"
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
        <X className="absolute top-4 right-4 hover:bg-muted/10 rounded-full p-2 w-10 h-10 cursor-pointer lg:hidden" onClick={closeSideBar} />
        <Logo />
        <nav className="mt-8">
            <ul className="flex flex-col gap-4">
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <Home className="w-5 h-5 inline mr-4 " />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/courses" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <NotebookText className="w-5 h-5 inline mr-4 " />
                        <span>Courses</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/enrollment" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <Heart className="w-5 h-5 inline mr-4 " />
                        <span>Add Courses</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/academics" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <GraduationCap className="w-5 h-5 inline mr-4 " />
                        <span>Academics</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/forum" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <MessageSquareMore className="w-5 h-5 inline mr-4 " />
                        <span>Forums</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notification" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <Bell className="w-5 h-5 inline mr-4 " />
                        <span>Notifications</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={({isActive}) => `text-muted hover:text-text font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center ${isActive ? "text-text bg-muted/10" : ""}`} onClick={closeSideBar}>
                        <UserRound className="w-5 h-5 inline mr-4 " />
                        <span>Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="text-[#dc3545] font-medium hover:bg-muted/10 rounded-lg px-4 py-3 flex items-center">
                        <LogOut className="w-5 h-5 inline mr-4 " />
                        <span>Logout</span>
                    </NavLink>
                </li> 
            </ul>  
        </nav>
    </aside>
    </>
  )
}

export default Sidebar