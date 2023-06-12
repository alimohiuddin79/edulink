"use client";
import axios from "axios";
import BlogsContainer from "../components/BlogsContainer";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";

const BlogsPage = () => {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get('https://edulink-three.vercel.app/api/blogs');
      const data = await res.data;
      if(data) {
        setBlogs(data);
      }
    }

    fetchBlogs();
  }, []);

  // console.log(blogs);

  return (
    <>
      <PageWrapper pageName="Blogs">
        <BlogsContainer blogs={blogs.reverse()} />
      </PageWrapper>
    </>
  )
}

export default BlogsPage;