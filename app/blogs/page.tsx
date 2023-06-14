"use client";
import axios from "axios";
import BlogsContainer from "../components/BlogsContainer";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { FormLabel, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type Blog = {
  _id: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  img: string;
  tags: [];
}

const BlogsPage = () => {

  const [searchText, setSearchText] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get('https://edulink-three.vercel.app/api/blogs');
      const data = await res.data;
      if(data) {
        setBlogs(data.reverse());
        setAllBlogs(data.reverse());
      }
    }

    fetchBlogs();
  }, []);

  const handleSearch = () => {
    if (searchText === '') {
      setBlogs(allBlogs);
    } else {
      const searchResults = blogs.filter((blog: Blog) => blog.title.toLowerCase().includes(searchText.toLowerCase()) || blog.authorName.toLowerCase().includes(searchText.toLowerCase()));
      setBlogs(searchResults);
    } 
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  // console.log(blogs);

  return (
    <>
      <PageWrapper pageName="Blogs">
        <div
          className="
            w-72
            self-center
            flex
            flex-col
            mb-6
          "
        >
            <FormLabel textAlign={'start'}>Search</FormLabel>
          <InputGroup>
            <Input
              focusBorderColor={'primary-1'}
              _focus={{ color: 'primary-1'}}
              color={'revert'}
              variant={'filled'}
              placeholder="Next JS"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            >
            </Input>
            <InputRightElement>
              <IconButton 
                aria-label="Blogs search"
                backgroundColor={'whiteAlpha.500'}
                icon={<SearchIcon color={'revert'} />}
                onClick={handleSearch}
                _hover={{ backgroundColor: "primary-1"}}
              />
            </InputRightElement>
          </InputGroup>
        </div>
        <BlogsContainer blogs={blogs} />
      </PageWrapper>
    </>
  )
}

export default BlogsPage;