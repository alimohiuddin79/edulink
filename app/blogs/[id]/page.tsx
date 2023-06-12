"use client";
/* eslint-disable @next/next/no-img-element */
import PageWrapper from '@/app/components/PageWrapper';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface IParams {
  id: string;
}

type Blog = {
  _id: string;
  title: string;
  tags: [string];
  img: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

const BlogPostPage = ({ params }: { params: IParams }) => {
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`https://edulink-three.vercel.app/api/blog/${params.id}`);
      const data = await res.data;
      setBlog(data);
    };

    fetchBlog();
  }, [params.id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageWrapper pageName={blog.title}>
        <div className="mx-auto flex flex-col gap-y-6 max-w-5xl w-full p-6 shadow-lg rounded-md">
          {/* <img src={blog.img.toString()} alt={blog.title} className="w-full h-96" /> */}
          <div className="w-full h-96 aspect-square">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    width={1024}
                    height={384}
                    className="object-cover w-full h-full"
                  />
                </div>
          <div>
            <h3 className="font-semibold text-lg">Author: {blog.authorName}</h3>
            <p className="font-light text-sm">
              {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
            </p>
          </div>

          <div className="text-base" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </PageWrapper>
    </>
  );
};

export default BlogPostPage;
