"use client";

import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    {
      icon: <MonitorPlay className="text-blue-500" />,
      label: "Courses",
      path: "/instructor/courses",
    },
    {
      icon: <BarChart4 className="text-red-500" />,
      label: "Performance",
      path: "/instructor/performance",
    },
  ];

  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r border-gray-200 shadow-md px-3 my-4 gap-4 text-sm font-medium bg-white">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100
          ${pathname.startsWith(route.path) && "bg-blue-200 text-blue-800"}
          `}
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
