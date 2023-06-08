"use client";
import { useState, useEffect } from 'react'
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog');

        setBlogs(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchBlogs();
  }, [])
  return (
    <div>
        {blogs}
    </div>
  )
}

export default Blogs;