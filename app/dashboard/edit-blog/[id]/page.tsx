"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/app/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";

import {
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import TextEditor from "@/app/components/TextEditor/TextEditor";
import PageWrapper from "@/app/components/PageWrapper";

interface IParams {
  id: string;
}

type Blog = {
    title?: string;
    tags?: [string];
    img?: string;
    content?: string;
}

type User = {
  _id?: string;
  type?: 'admin' | 'counselor' | 'student';
}

const EditBlogPage = ({ params }: { params: IParams }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({});
    const [blog, setBlog] = useState<Blog>({});
    const [contentInitialValue, setContentInitialValue] = useState("");
    console.log(params.id);
    // console.log(user.type);

  const session = useSession();
  const router = useRouter();

  const [title, setTitle] = useState<string>(blog.title ? blog.title : "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [content, setContent] = useState<any>(blog.content ? blog.content : "");

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const [tags, setTags] = useState<string[]>(blog.tags ? blog.tags : []);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const [imgUrl, setImgUrl] = useState(blog.img ? blog.img : "");
  const handleUpload = (result: any) => {
    setImgUrl(result?.info?.secure_url);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault();
    await axios.patch(`https://edulink-three.vercel.app/blog/${params.id}`, {
      title,
      content,
      tags,
      img: imgUrl,
    }).then(() => {
      toast({
        title: "Blog Updated.",
        description: "Go to blogs page to preview updated blog.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  if (session.status === "loading") {
    <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("https://edulink-three.vercel.app/api/user-data");
      const data = await res.data;
      setUser(data);
    };

    const getBlogData = async () => {
      const res = await axios.get(`https://edulink-three.vercel.app/api/blog/${params.id}`);
      const data = await res.data;
      setBlog(data);
      setTitle(data.title || "");
      if (data.content) {
        setContent(data.content);
        setContentInitialValue(data.content);
      }
      setTags(data.tags || []);
      setImgUrl(data.img || "");
      setTags(data.tags || []);
      setImgUrl(data.img || "");
    };

    getUser();
    getBlogData();
  }, [params.id]);
  console.log(blog);
    console.log(content);

  if (user?.type === 'counselor' || user?.type === 'admin') {
    return (
        <>
          <PageWrapper pageName={`Update ${title}`}>
            <form onSubmit={handleSubmit} className="w-full">
              <div
                className="
                  max-w-5xl
                  mx-auto
                  border-[1px]
                  border-gray-400
                  rounded-2xl
                  p-6
                  shadow-lg
                "
              >
                <div
                  className="
                    w-full
                    flex
                    flex-col
                    gap-y-6
                  "
                >
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Next JS"
                      required
                      value={title}
                      onChange={handleTitleChange}
                      focusBorderColor="primary-1"
                    />
                  </FormControl>
                  <div
                    className="
                    flex
                    flex-row
                    justify-between
                    gap-x-6
                "
                  >
                    <div className="flex-1">
                      <FormControl>
                        <FormLabel>Tags</FormLabel>
                        <Input
                          focusBorderColor="primary-1"
                          type="text"
                          placeholder="Add tags..."
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleInputKeyDown}
                        />
                        <Flex flexWrap="wrap" mt={2}>
                          {tags.map((tag, index) => (
                            <Tag
                              key={index}
                              mr={2}
                              mt={2}
                              size="md"
                              borderRadius="full"
                            >
                              <TagLabel>{tag}</TagLabel>
                              <TagCloseButton
                                onClick={() => handleTagRemove(tag)}
                              />
                            </Tag>
                          ))}
                        </Flex>
                      </FormControl>
                    </div>
                    <div className="flex-1 w-full">
                      <FormControl isRequired>
                        <FormLabel>Image Upload</FormLabel>
    
                        <div
                          className="
                            flex
                            justify-center
                            border-[1px]
                            border-inherit
                            focus:border-[#36F8B2]
                            rounded-md
                        "
                        >
                          <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="vh8znhrn"
                          >
                            <FaImage fontSize={"36px"} />
                          </CldUploadButton>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                  <div>
                    <TextEditor
                      onEditorChange={handleEditorChange}
                      initialValue={contentInitialValue}
                      value={content}
                    />
                  </div>
                  <Button type="submit" disabled={loading}>Update</Button>
                </div>
              </div>
            </form>
          </PageWrapper>
        </>
      );
  }
};

export default EditBlogPage;
