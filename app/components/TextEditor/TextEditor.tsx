"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import initFullProps from "./initFullprops";

const CustomEditor = () => {
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState<any>(undefined);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getContent();
      // console.log(htmlContent);
      setContent(htmlContent);
    }
  };

  return (
    <>
      <Editor
        id="Editor"
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          ...initFullProps,
        }}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </>
  );
};

export default CustomEditor;