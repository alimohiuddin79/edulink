"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  useToast
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "./Button";

interface ModalarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<ModalarProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
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
      type: Yup.string().required("Which one you are?").oneOf(["student", "counselor"], "Invalid type"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      axios.post('/api/register', values)
      .then(() => {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        signIn('credentials', values);
        router.push("/resume-builder");
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          status: 'error',
          isClosable: true
        });
      })
      .finally(() => {
        setLoading(false);
      });
      formik.resetForm();
    },
  });

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader
              textAlign={"center"}
              fontSize={"3xl"}
              fontWeight={"bold"}
            >
              Sign Up
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack rowGap={"24px"}>
                <FormControl
                  isInvalid={
                    !!formik.touched.name && !!formik.errors.name
                  }
                  isRequired
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    variant={"outline"}
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

                <FormControl as="fieldset" isRequired>
                  <FormLabel as="legend">Select a type</FormLabel>
                  <RadioGroup defaultValue="student">
                    <HStack spacing="24px">
                      <Radio colorScheme="teal" value="student">Student</Radio>
                      <Radio colorScheme="teal" value="counselor">Counselor</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormErrorMessage>
                    {formik.touched.type && formik.errors.type ? (
                      <div>{formik.errors.type}</div>
                    ) : null}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter columnGap={"24px"}>
              <div
                className="
                    flex
                    gap-x-4
              "
              >
                <Button onClick={onClose} type="button" secondary>
                  Close
                </Button>
                <Button type="submit" disabled={loading}>
                  Sign Up
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SignUpModal;
