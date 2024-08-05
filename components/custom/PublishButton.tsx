"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PublishButtonProps {
  disabled: boolean;
  courseId: string;
  sectionId?: string;
  isPublished: boolean;
  page: "Course" | "Section"; // Ensure 'page' has specific possible values
}

const PublishButton = ({
  disabled,
  courseId,
  sectionId,
  isPublished,
  page,
}: PublishButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    const baseUrl = `/api/courses/${courseId}`;
    const url =
      page === "Section" && sectionId
        ? `${baseUrl}/sections/${sectionId}`
        : baseUrl;

    try {
      setIsLoading(true);
      const action = isPublished ? "unpublish" : "publish";
      await axios.post(`${url}/${action}`);

      toast.success(`${page} ${isPublished ? "unpublished" : "published"}`);
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(
        `Failed to ${isPublished ? "unpublish" : "publish"} ${page}`,
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPublished ? (
        "Unpublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

export default PublishButton;
