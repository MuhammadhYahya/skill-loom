"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface RichEditorProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}

// Dynamically import the ReactQuill component, client-side only
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichEditor = ({ placeholder, onChange, value }: RichEditorProps) => (
  <ReactQuill
    theme="snow"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default RichEditor;
