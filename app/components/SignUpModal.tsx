"use client";
import React from "react";
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
import Button from "./Button";

interface ModalarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<ModalarProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      type: 0,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "must be at least 2 character long")
        .max(12, "Too long")
        .required("Please enter your name"),
      lasttName: Yup.string()
        .min(2, "must be at least 2 character long")
        .max(12, "Too long")
        .notRequired(),
      email: Yup.string()
        .email()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required("Please enter your email"),
      password: Yup.string()
        .min(8, "must be at least 8 character long")
        .max(30, "No one can hack your password now.")
        .required("Please enter your password"),
      type: Yup.number().min(0).max(1).required("Which one you are?"),
    }),
    onSubmit: (values) => {
      console.log(values);
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
                    !!formik.touched.firstName && !!formik.errors.firstName
                  }
                  isRequired
                >
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    variant={"outline"}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    required
                  />
                  <FormErrorMessage>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div>{formik.errors.firstName}</div>
                    ) : null}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!formik.touched.lastName && !!formik.errors.lastName
                  }
                >
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    variant={"outline"}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  <FormErrorMessage>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div>{formik.errors.lastName}</div>
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
                  <RadioGroup defaultValue="0">
                    <HStack spacing="24px">
                      <Radio colorScheme="teal" value="0">Student</Radio>
                      <Radio value="1">Counselor</Radio>
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
                <Button
                 type="submit"
                 onClick={() =>
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }
                >
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
