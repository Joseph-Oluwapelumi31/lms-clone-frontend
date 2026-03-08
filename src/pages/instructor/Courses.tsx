import { useOutletContext } from "react-router-dom"
import type { Course } from "../../types/instructorDashboard";

type DashboardOutletContext = {
  courses: Course[];
};


const Courses = () => {
  const { courses } = useOutletContext<DashboardOutletContext>();
  
  return (
    <div>{courses[0].title}</div>
  )
}

export default Courses