import { Bell, Search} from "lucide-react" 

type TopbarProps = {
    isOpen: boolean;
    toggleDropdown: () => void;
}

const Topbar = ({  toggleDropdown }: TopbarProps) => {

    
  return (
    <>
        

        <section className="flex justify-between  bg-white p-4"   >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 ">
                    <p onClick={toggleDropdown} className="bg-bg text-white p-2 h-10 w-10 cursor-pointer rounded-full relative font-bold text-center items-center justify-center flex">J 
                    <span className="bg-green-600 p-2 rounded-full absolute bottom-0 right-0"></span>
                    </p>
                </div>
                <div>
                    <p className="text-xs  text-muted">Good Day,</p>
                    <h2 className="text-text font-bold">JOSEPH</h2>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Search className="w-10 h-10  bg-slate-50 p-2 rounded-full" />
                <div className="relative">
                    <Bell className="w-10 h-10 bg-slate-50 p-2 rounded-full" />
                    <span className="bg-red-600 p-2 rounded-full absolute -top-1 -right-1 text-xs h-3 w-3 text-white"></span>
                </div>
            </div>

        </section>
    </>
  )
}

export default Topbar