"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import initFullProps from "./initFullprops";

const TextEditor = ({ onEditorChange, value, initialValue }: { onEditorChange: (newContent: any) => void, value: any, initialValue: string }) => {
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState<any>(undefined);
  const session = useSession();

  
  const handleEditorChange = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getContent();
      setContent(htmlContent);
      onEditorChange(htmlContent);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      setContent(value);
    }
  }, [value]);

  if (session.status === "loading") {
    <p>Loading...</p>
  } 
    return (
      <>
        <Editor
          id="Editor"
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          init={{
            ...initFullProps,
          }}
          initialValue={initialValue}
          value={content}
          onEditorChange={handleEditorChange}
          onInit={(evt, editor) => (editorRef.current = editor)}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      </>
    );
  }


export default TextEditor;