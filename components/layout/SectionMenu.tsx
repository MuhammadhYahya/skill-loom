import { Course, Section } from "@prisma/client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

interface SectionMenuProps {
  course: Course & { sections: Section[] };
}

const SectionMenu = ({ course }: SectionMenuProps) => {
  return (
    <div className="z-60 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-400"
          >
            Sections
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white border border-gray-200 shadow-lg">
          <Link
            href={`/courses/${course.id}/overview`}
            className="p-3 rounded-lg text-blue-700 hover:bg-blue-100 mt-4"
          >
            Overview
          </Link>
          {course.sections.map((section) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/sections/${section.id}`}
              className="p-3 rounded-lg text-blue-700 hover:bg-blue-100 mt-4"
            >
              {section.title}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionMenu;
