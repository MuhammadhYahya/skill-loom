"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

// Define the type for the props
interface ReadTextProps {
  value: string;
}

// Dynamically import the ReactQuill component, client-side only
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReadText = ({ value }: ReadTextProps) => {
  // Memoize the component to avoid unnecessary re-renders
  const Quill = useMemo(() => ReactQuill, []);

  return <Quill theme="bubble" value={value} readOnly />;
};

export default ReadText;
