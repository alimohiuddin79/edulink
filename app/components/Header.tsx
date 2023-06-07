"use client";
import Image from "next/image";
import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import Button from "./Button";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  return (
    <header
      className="
        flex
        justify-between
        items-center
        py-4
      "
    >
      <Link href={"/"}>
        <Image
          src={"/assets/icons/Logo.png"}
          alt="logo"
          width={112}
          height={32}
        />
      </Link>
      <nav
        className="
            flex
            justify-between
            items-center
            gap-x-5
          "
      >
        <DarkModeToggle />
        <ul
          className="
              flex
              gap-x-3
            "
        >
          <li>
            <Link href={"/resume-builder"}>Resume Builder</Link>
          </li>
          <li>
            <Link href={"/counselors"}>Hire a Counselor</Link>
          </li>
          <li>
            <Link href={"/blogs"}>Blogs</Link>
          </li>
          <li>
            <Link href={"/questionnaire"}>Questionnaire</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact Us</Link>
          </li>
        </ul>
        <div
          className="
              flex
              gap-x-3
            "
        >
          {session?.status === "authenticated" ? (
            <>
            {session?.data?.user?.name}
            <Button onClick={() => signOut()} type="button">
                Sign Out
            </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setLoginModal(true)} type="button">
                Login
              </Button>
              <LoginModal
                isOpen={loginModal}
                onClose={() => setLoginModal(false)}
              />
              <Button onClick={() => setSignUpModal(true)} type="button">
                Sign Up
              </Button>
              <SignUpModal
                isOpen={signUpModal}
                onClose={() => setSignUpModal(false)}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
