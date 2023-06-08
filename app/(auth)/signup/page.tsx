/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  RadioGroup,
  HStack,
  Radio,
  Select,
  MenuList,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      type: "student",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "must be at least 2 character long")
        .max(12, "Too long")
        .required("Please enter your name"),
      email: Yup.string()
        .email()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required("Please enter your email"),
      password: Yup.string()
        .min(8, "must be at least 8 character long")
        .max(30, "No one can hack your password now.")
        .required("Please enter your password"),
      phoneNumber: Yup.string()
        .matches(/^(?:\+?92|0)\d{10}$/)
        .required("Phone number is required"),
      gender: Yup.string()
        .required("Select gender")
        .oneOf(["male", "female"], "Invalid type"),
      dob: Yup.date().required("Date of Birth is required"),
      type: Yup.string()
        .required("Which one you are?")
        .oneOf(["student", "counselor"], "Invalid type"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      axios
        .post("/api/register", values)
        .then(() => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          signIn("credentials", values);
          router.push("/resume-builder");
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
      // formik.resetForm();
    },
  });

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/");
  } else {
    return (
      <>
        <div
          className="
                    max-w-lg
                    w-full
                "
        >
          <form onSubmit={formik.handleSubmit}>
            <div
              className="
                    flex
                    flex-col
                    gap-y-6
                    justify-center
                    items-center
                "
            >
              <FormControl
                isInvalid={!!formik.touched.name && !!formik.errors.name}
                isRequired
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  variant={"outline"}
                  focusBorderColor="primary-1"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                />
                <FormErrorMessage>
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!formik.touched.email && !!formik.errors.email}
                isRequired
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  variant={"outline"}
                  focusBorderColor="primary-1"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="johndoe@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
                <FormErrorMessage>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
                isRequired
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  variant={"outline"}
                  focusBorderColor="primary-1"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                />
                <FormErrorMessage>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </FormErrorMessage>
              </FormControl>

              <div
                className="
                            w-full
                            flex
                            justify-between
                            gap-x-3
                        "
              >
                <FormControl
                  isInvalid={!!formik.touched.gender && !!formik.errors.gender}
                  isRequired
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    focusBorderColor="primary-1"
                    placeholder="Select"
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    required
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </Select>
                  <FormErrorMessage>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div>{formik.errors.gender}</div>
                    ) : null}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!formik.touched.dob && !!formik.errors.dob}
                  isRequired
                >
                  <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                  <Input
                    variant={"outline"}
                    focusBorderColor="primary-1"
                    id="dob"
                    name="dob"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                    required
                  />
                  <FormErrorMessage>
                    {formik.touched.dob && formik.errors.dob ? (
                      <div>{formik.errors.dob}</div>
                    ) : null}
                  </FormErrorMessage>
                </FormControl>
              </div>

              <FormControl
                isInvalid={
                  !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
                isRequired
              >
                <FormLabel htmlFor="phoneNumber">Phone</FormLabel>
                <Input
                  focusBorderColor="primary-1"
                  type="tel"
                  placeholder="phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  required
                />
                <FormErrorMessage>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div>{formik.errors.phoneNumber}</div>
                  ) : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Select a type</FormLabel>
                <RadioGroup defaultValue="student">
                  <HStack spacing="24px">
                    <Radio colorScheme="teal" value="student">
                      Student
                    </Radio>
                    <Radio colorScheme="teal" value="counselor">
                      Counselor
                    </Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>
                  {formik.touched.type && formik.errors.type ? (
                    <div>{formik.errors.type}</div>
                  ) : null}
                </FormErrorMessage>
              </FormControl>

              <div
                className="
                            mt-6
                            flex
                            flex-col
                            gap-y-6
                        "
              >
                <Button type="submit" disabled={loading}>
                  Sign Up
                </Button>
                <Link href={"/login"}>Already Have an Account?</Link>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default Login;
