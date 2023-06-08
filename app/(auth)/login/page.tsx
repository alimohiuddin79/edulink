/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required("Please enter your email"),
      password: Yup.string()
        .min(8, "must be at least 8 character long")
        .max(30, "No one can hack your password now.")
        .required("Please enter your password"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      signIn("credentials", {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              title: `${callback?.error}`,
              status: "error",
              isClosable: true,
            });
          }

          if (callback?.ok && !callback?.error) {
            toast({
              title: "Logged In",
              status: "success",
              isClosable: true,
            });
            router.push("/resume-builder");
          }
        })
        .finally(() => setLoading(false));
      formik.resetForm();
    },
  });

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "authenticated") {
    router.push("/");
  } 

  else {
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
                  isInvalid={!!formik.touched.password && !!formik.errors.password}
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
                            mt-6
                            flex
                            flex-col
                            gap-y-6
                        "
                >
                  <Button type="submit" disabled={loading}>
                    Login
                  </Button>
                  <Link href={"/signup"}>Don't Have an Account?</Link>
                </div>
              </div>
            </form>
          </div>
        </>
      );
  }

  
};

export default Login;
