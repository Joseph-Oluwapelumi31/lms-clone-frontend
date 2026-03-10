import { useParams } from "react-router-dom"
import { api } from "../../lib/api";
import { useState, useEffect } from "react";
import type{ Course } from "../../types/instructorDashboard";

type CoursesResponse = {
  data: Course;
};

const CourseDetail = () => {
    const [course, setCourse]= useState<Course | null>(null)

    const {id} = useParams();

    useEffect(()=>{
        try {
            const fetchCourse = async()=>{
                const res = await api.get<CoursesResponse>(`/courses/${id}`)
                setCourse(res.data.data)
                console.log(res)
            }
            fetchCourse();
        } catch (error) {
            console.log('error' + error)
        };
        
    }, [id])
  return (
    <div>
        <h1>{course?.title}</h1>
    </div>
  )
}

export default CourseDetail