"use client";
import Image from "next/image";
import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import Button from "./Button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const session = useSession();
  const router = useRouter();
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
              <Button onClick={() => router.push('/login')} type="button">
                Login
              </Button>
              <Button onClick={() => router.push('/signup')} type="button">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
