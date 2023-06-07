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
  useToast
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface ModalarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
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
      signIn('credentials', {
        ...values,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: `${callback?.error}`,
            status: 'error',
            isClosable: true
          });
        }

        if (callback?.ok && !callback?.error) {
          toast({
            title: 'Logged In',
            status: 'success',
            isClosable: true
          });
          router.push("/resume-builder");
        }
      })
      .finally(() => setLoading(false));
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
              Login
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack rowGap={"24px"}>

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
                <Button type="submit" disabled={loading}>Login</Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;
