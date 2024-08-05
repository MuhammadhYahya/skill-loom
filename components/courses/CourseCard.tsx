import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="border rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
        alt={course.title}
        width={500}
        height={300}
        className="rounded-t-xl w-[320px] h-[180px] object-cover"
      />
      <div className="px-4 py-3 flex flex-col gap-2 bg-white">
        <h2 className="text-lg font-bold text-[#FDAB04] hover:text-[#e58f00] transition-colors duration-300">
          {course.title}
        </h2>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          {instructor && (
            <div className="flex gap-2 items-center">
              <Image
                src={
                  instructor.imageUrl
                    ? instructor.imageUrl
                    : "/avatar_placeholder.jpg"
                }
                alt={
                  instructor.fullName ? instructor.fullName : "Instructor photo"
                }
                width={30}
                height={30}
                className="rounded-full border-2 border-[#FDAB04]"
              />
              <p>{instructor.fullName}</p>
            </div>
          )}
          {level && (
            <div className="flex gap-2 items-center text-[#00BFFF]">
              <Gem size={20} />
              <p>{level.name}</p>
            </div>
          )}
        </div>
        <p className="text-sm font-bold text-[#20b2aa]">$ {course.price}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
