import { GraduationCap, Info} from "lucide-react"
import { useState, useEffect } from "react"
import { api } from "../../lib/api";

type Tab = {
  key: string;
  label: string;
}
const tabs : Tab[] = [
  {key: "personal", label: "Personal Details"},
  {key: "edit-profile", label: "Edit Profile"},
  {key: "security", label: "Security"},
]


const InstructorProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  // useEffect(()=>{
  //   const res = api.get('/courses', )
  //   s
  // })

  return (
    <section>

      <div className="md:hidden">
        <h1 className="text-text font-bold text-xl mb-1">My Profile</h1>
        <p className="text-sm">Manage your account & settings</p>
      </div>

      {/* Profile details and settings would go here */}
      <div className="bg-white flex flex-col md:flex-row  justify-items-center rounded-xl shadow-md mt-4">
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 text-center md:text-start">
        <div className="flex justify-center items-center p-1 shadow-md rounded-full w-25 h-25">
          <h2 className="text-text font-extrabold text-4xl w-23 h-23  p-6 bg-slate-50 rounded-full text-center relative">J
            <span className="bg-green-600 p-2 rounded-full absolute bottom-0 right-0"></span>

          </h2>
          
        </div>

        <div className=" mt-4 md:self-end md:mt-0">
          <h1 className="text-text font-bold text-xl mb-2 md:mb-0">JOSEPH Oluwapelumi Elijah</h1>
          <div className="md:flex gap-2">
            <div className="flex   items-center justify-center md:block">
             <p className="text-muted text-xs bg-slate-50 px-2 py-1 h-5 flex justify-center items-center border border-gray-400 rounded-full max-w-25">SCI/24/25/0575</p>

            </div>

            <div >
              <GraduationCap className=" text-muted inline  mr-2 m" />
              <span className="text-muted text-sm ">Computer Science • 200 Lvl</span>
            </div>
          </div>
          
        </div>
        
        

      </div>

      </div>

      

      <div className="flex flex-wrap bg-white p-2 rounded-full mt-4 w-full shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return(
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-full transition-colors hover:cursor-pointer flex-1 font-bold text-sm min-w-[144px] ${isActive ? 'bg-bg text-white' : ' hover:bg-slate-100'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          );

        })}
      </div>

      {/* Content */}
      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
        {activeTab === "personal" && <PersonalDetails />}
        {activeTab === "edit-profile" && <AcademicDetails />}
        {activeTab === "security" && <Security />}
      </div>

    </section>
  )
}

const PersonalDetails = () => {
  return (
    <>
    <div>
      <h2 className="text-text font-bold text-lg mb-4 pb-2 border-b border-slate-200">Information</h2>
    </div>

    <div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">EMAIL ADDRESS</h3>
        <p className="text-sm text-muted mb-4">joluwapelumi@gmail.com</p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">PHONE</h3>
        <p className="text-sm text-muted mb-4">Not set</p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">DATE OF BIRTH</h3>
        <p className="text-sm text-muted mb-4">Not set</p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">STATE OF ORIGIN</h3>
        <p className="text-sm text-muted mb-4">Not set</p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">NATIONALITY</h3>
        <p className="text-sm text-muted mb-4"></p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">ADDRESS</h3>
        <p className="text-sm text-muted mb-4">Not set</p>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-muted text-sm">ADDRESS</h3>
        <p className="text-sm text-muted mb-4">Not set</p>
      </div>

    </div>
    </>
  )
}

const AcademicDetails = () => {
  return (
    <>
    <div className="text-sm text-text bg-[#cff4fc] p-4 mb-4">
      <Info className="text-muted inline h-4 w-4 mr-2" />
      <span> Some details like Name, Matric No, and Email cannot be changed. Contact admin for corrections.</span>
    </div>
    <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="phone-number" className="font-bold mb-2 text-muted text-sm">Phone Number</label>
            <input type="text" id="phone-number" className=" bg-slate-50 h-10 rounded-full p-4" name="phone-number" placeholder="+234..."/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="font-bold mb-2 text-muted text-sm">Gender</label>
            <select  id="gender" className=" bg-slate-50 h-10 rounded-full px-4"  name="gender" >
              <option> Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="date-of-birth" className="font-bold mb-2 text-muted text-sm">Date of Birth</label>
            <input type="date" id="date-of-birth" className=" bg-slate-50 h-10 rounded-full p-4"  name="date-of-birth"  placeholder="e.g. 12/05/2003" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nationality" className="font-bold mb-2 text-muted text-sm">Nationality</label>
            <input type="text" id="nationality" className=" bg-slate-50 h-10 rounded-full p-4"  name="nationality"  placeholder="e.g. Nigerian" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="font-bold mb-2 text-muted text-sm">State of Origin</label>
            <input type="text" id="state" className=" bg-slate-50 h-10 rounded-full p-4"  name="state"  placeholder="eg. Lagos" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-bold mb-2 text-muted text-sm">Residential Address</label>
            <textarea id="address" className=" bg-slate-50 h-25 rounded-xl p-4 " placeholder="Enter full address" name="address"  ></textarea>
          </div>
          

          
          <button type="submit" className=" bg-bg text-white rounded-full shadow-xl h-12 cursor-pointer hover:bg-bg/90 p-2 mt-4 max-w-60">Update Profile</button>
    </form>
    </>
  )
}

const Security = () => {
  return (
    <>
    <div>
      <h2 className="text-text font-bold text-lg mb-4 pb-2 border-b border-slate-200">Change Password</h2>
    </div>
    <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="current-password" className="font-bold mb-2 text-muted text-sm">Current Password</label>
            <input type="password" id="current-password" className=" bg-slate-50 h-10 rounded-full p-4" name="current-password" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newpassword" className="font-bold mb-2 text-muted text-sm">New Password</label>
            <input type="password" id="newpassword" className=" bg-slate-50 h-10 rounded-full p-4"  name="newpassword"  />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirm-newpassword" className="font-bold mb-2 text-muted text-sm">Confirm New Password</label>
            <input type="password" id="confirm-newpassword" className=" bg-slate-50 h-10 rounded-full p-4"  name="confirm-newpassword"  />
          </div>
          

          
          <button type="submit" className=" bg-[#ffc107] right-0 text-black  rounded-full shadow-xl h-12 cursor-pointer hover:bg-[#ffc107]/90 p-2 mt-4 max-w-60">Update Password</button>
        </form>
    </>
  )
}

export default InstructorProfile