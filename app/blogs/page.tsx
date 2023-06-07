"use client";
import { useState, useEffect } from 'react'
import axios from "axios";

const Blogs = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/blog');

        setCourses(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchCourses();
  }, [])
  return (
    <div>
        {courses}
    </div>
  )
}

export default Blogs