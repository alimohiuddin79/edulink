"use client";
import { useRef, useState, useEffect } from "react";
import TextEditor from "../components/TextEditor/TextEditor";
import ResumeAccordian from "../components/Accordians/ResumeAccordian";
import { Spinner } from "@chakra-ui/react";

const ResumeBuilder = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [content, setContent] = useState<any>(null);
  const editorRef = useRef<any>(null);

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [])
  return (
    <>
      <ResumeAccordian />
      <div
        className="
          max-w-5xl
          mx-auto
          border-[1px]
          border-gray-400
          rounded-2xl
          p-6
          shadow-lg
        "
      >
        {loading ? (
          <Spinner size={'xl'} color="primary-1" />
        ) : (
          <TextEditor onEditorChange={handleEditorChange} initialValue="Hello Eduling" value={content} />
        )}
      </div>
    </>
  );
};

export default ResumeBuilder;
