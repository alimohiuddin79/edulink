"use client";
import { useState } from "react";
import TextEditor from "../components/TextEditor/TextEditor";
import ResumeAccordian from "../components/Accordians/ResumeAccordian";

const ResumeBuilder = () => {
  const [content, setContent] = useState<any>
  ("");

  const handleEditorChange = (newContent: any) => {
      // console.log(htmlContent);
      setContent(newContent);
    }
  return (
    <>
      <ResumeAccordian />
      <TextEditor onEditorChange={handleEditorChange} value={content} />
    </>
  );
  };

export default ResumeBuilder;
