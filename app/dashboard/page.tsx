"use client";
import React, { useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Button from "../components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";

import {
  Box,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import TextEditor from "../components/TextEditor/TextEditor";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [content, setContent] = useState<any>("");

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const [tags, setTags] = useState<string[]>([]);
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

  const [imgUrl, setImgUrl] = useState("");
  const handleUpload = (result: any) => {
    setImgUrl(result?.info?.secure_url);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title, imgUrl, tags, content);
    // axios.post("api/blog/", {
    //   title: blog.title,
    //   content: blog.content,
    //   img: imgUrl,
    // });

  };

  if (session.status === "loading") {
    <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
    
      <form onSubmit={handleSubmit} className="w-full">
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
                  <Tag key={index} mr={2} mt={2} size="md" borderRadius="full">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
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
            <TextEditor onEditorChange={handleEditorChange} value={content} />
        </div>
        <Button type="submit">Create</Button>
    </div>
      </form>
    </>

    // <div>
    //     <form onSubmit={handleSubmit}>
    //         <input type="text" name='title' onChange={handleChange} />
    //         <input type="text" name='content' onChange={handleChange} />
    //         <CldUploadButton
    //         options={{ maxFiles: 1 }}
    //         onUpload={handleUpload}
    //         uploadPreset='vh8znhrn'
    //         >
    //             <Button type='button'>Hello</Button>
    //         </CldUploadButton>

    //         <Button type='submit'>Create</Button>
    //     </form>
    // </div>
    
  );
};

export default Dashboard;
