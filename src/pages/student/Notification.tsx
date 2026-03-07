import { BellOff } from "lucide-react"

const Notification = () => {
  return (
    <section>
      <div className="">
        <h1 className="text-text font-bold text-xl mb-2">Notifications</h1>
        <p className="text-muted text-sm mb-8">Stay updated with your latest alerts.</p>
      </div>
      <div className="bg-white flex flex-col gap-4 p-2 justify-center items-center rounded-2xl shadow-sm  h-70">
            <div className="p-4 rounded-full bg-slate-50 text-black">
              <BellOff className="h-10 w-10 text-muted" />
            </div>
            <h2 className="text-text font-bold text-lg md:text-xl mb-2">No notifications yet</h2>
            <p className="text-muted text-sm mb-8">We'll let you know when something important happens.</p>
          </div> 
    </section>
  )
}

export default Notification