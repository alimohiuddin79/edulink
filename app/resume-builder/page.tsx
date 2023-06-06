import React from "react";
import TextEditor from "../components/TextEditor/TextEditor";
import ResumeAccordian from "../components/Accordians/ResumeAccordian";
import LightHeading from "../components/LightHeading";

const ResumeBuilder = () => {
  return (
    <>
      <section className="py-12">
        <div
          className="
            flex
            flex-col
            gap-y-6
        "
        >
          <h1
            className="
            text-4xl
            font-semibold
            text-[#36F8B2]
            uppercase
            text-center
            mb-10
        "
          >
            resume builder
          </h1>
          <ResumeAccordian />
          <TextEditor />
        </div>
      </section>
    </>
  );
};

export default ResumeBuilder;
