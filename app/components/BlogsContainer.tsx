"use client";
import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import Pagination from "./Pagination";
import TruncatedHtml from "./TruncatedHtml";
import { Text } from "@chakra-ui/react";
import { truncateText } from "../utils/truncatedHtmlToText";

type Blog = {
  _id: string;
  title: string;
  tags: string[];
  img: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

interface BlogPostProps {
  blogs: Blog[];
}

const BlogsContainer: React.FC<BlogPostProps> = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = blogs.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // console.log(blogs);

  return (
    <>
      <div className="max-w-5xl mx-auto border-2 border-gray-400 rounded-md p-8 shadow-lg">
        <div className="flex flex-col items-start gap-y-6">
          {currentRows.map((blog: Blog) => (
            <Link key={blog._id} href={`/blogs/${blog._id}`}>
              <div className="flex justify-between gap-x-5">
                <div className="w-52 h-52 aspect-square">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    width={208}
                    height={208}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <h3 className="font-medium text-lg">{blog.title}</h3>
                    <p className="font-light text-sm">
                      {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="p-1 bg-green-400 rounded-md mx-1">
                        #{tag}
                        {index !== blog.tags.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </div>

                  <div>
                    <Text noOfLines={[1, 2, 3, 4]}>
                      {truncateText(blog.content, 500)}
                    </Text>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div
            className="
              self-center
              my-4
            "
          >
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsContainer;
