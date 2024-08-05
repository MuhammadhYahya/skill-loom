"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ];

  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    { label: "Performance", path: "/instructor/performance" },
  ];

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link href="/">
        <Image src="/logo.png" height={100} width={200} alt="logo" />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-blue-100 rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-red-500 text-white rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-red-400"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5 text-gray-700" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {topRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-sm font-medium text-gray-700 hover:text-blue-500"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>

              {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium text-gray-700 hover:text-blue-500"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-400"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
