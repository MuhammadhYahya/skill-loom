"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: "Edit Course" | "Edit Section"; // Enforcing specific page values
}

const FileUpload = ({ value, onChange, endpoint, page }: FileUploadProps) => {
  // Render different content based on the page and value
  const renderContent = () => {
    if (page === "Edit Course" && value) {
      return (
        <Image
          src={value}
          alt="Uploaded image"
          width={500}
          height={500}
          className="w-[280px] h-[200px] object-cover rounded-xl"
        />
      );
    }

    if (page === "Edit Section" && value) {
      return <p className="text-sm font-medium">{value}</p>;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      {renderContent()}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) {
            onChange(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[280px] h-[200px]"
      />
    </div>
  );
};

export default FileUpload;
