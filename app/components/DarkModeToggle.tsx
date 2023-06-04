"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  return (
    <div
      onClick={toggle}
      className="
            relative
            w-12
            h-6
            border-2
            border-solid
            border-[#36F8B2]
            rounded-[32px]
            flex
            items-center
            justify-between
            p-1
            cursor-pointer
        "
    >
      <div className="text-xs">🌙</div>
      <div className="text-xs">🔆</div>
      <div
        className="
                w-4
                h-4
                bg-[#36F8B2]
                rounded-full
                absolute
            "
        style={mode === "light" ? { left: "4px" } : { right: "4px" }}
      />
    </div>
  );
};

export default DarkModeToggle;
