/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import BlogsTable from "../Tables/BlogsTable";
import UsersTable from "../Tables/UsersTable";
import Button from "../Button";
import { useRouter } from "next/navigation";
import EmptyState from "../EmptyState";

const DashboardAccordian = () => {
  const router = useRouter();
  const [type, setType] = useState<string>("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState<{ _id?: string }>({ _id: "" });;
  const [users, setUsers] = useState([]);
  // const blogs = await getBlogs();
  // console.log(blogs);
  // const fetcher = async (...args: Parameters<typeof fetch>) => {
  //   const res = await fetch(...args);
  //   return res.json();
  // };

  // const { data, mutate, error, isLoading } = useSWR('https://edulink-three.vercel.app/api/blog/', fetcher);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("https://edulink-three.vercel.app/api/user-data/");
      const data = await res.data;
      setUser(data);
      setType(data?.type);
    };
    const getBlogs = async () => {
      const res = await axios.get(`https://edulink-three.vercel.app/api/blogs/${user._id}`);
      const data = await res.data;
      // console.log(data);
      setBlogs(data);
    };
    const getAllUsers = async () => {
      const res = await axios.get("https://edulink-three.vercel.app/api/users");
      const data = await res.data;
      setUsers(data);
    };

    getUser();
    getBlogs();
    if (type === "admin") {
      getAllUsers();
    }
  }, [type]);

  // console.log(blogs);
  // console.log(type);
  // console.log(users);

  return (
    <>
      <Accordion defaultIndex={[0]} width={"100%"}>
        {type === "counselor" || type === "admin" ? (
          <>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "primary-1", color: "white" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Blogs
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel py={4} width={"100%"}>
                <div
                  className="
                border-2
                border-gray-300
                rounded-md
                shadow-md
                p-4
                flex
                flex-col
                gap-y-4
              "
                >
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard/create-blog")}
                  >
                    Create New Blog
                  </Button>
                  {blogs.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <BlogsTable blogs={blogs} />
                  )}
                </div>
              </AccordionPanel>
            </AccordionItem>
          </>
        ) : null}

        {type === "admin" && (
          <>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "primary-1", color: "white" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Users
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel py={4}>
                <div
                  className="
                border-2
                border-gray-300
                rounded-md
                shadow-md
                p-4
                flex
                flex-col
                gap-y-4
              "
                >
                  <UsersTable users={users} />
                </div>
              </AccordionPanel>
            </AccordionItem>
          </>
        )}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Meetings
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text textAlign={'center'}>Coming soon</Text>
            {/* <SelectedTable blogs={blogs} /> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DashboardAccordian;
