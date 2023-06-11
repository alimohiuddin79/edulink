import axios from "axios";
import BlogsContainer from "../components/BlogsContainer";
import PageWrapper from "../components/PageWrapper";

async function getBlogs() {
  const res = await axios.get('http://localhost:3000/api/blogs');
  const data = await res.data;
  return data;
}

const BlogsPage = async () => {
  const blogs = await getBlogs();
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