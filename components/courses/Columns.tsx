"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title", // course.title
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4 text-[#00BFFF]" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4 text-[#00BFFF]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-[#20b2aa]">{formatted}</div>; // Bright teal color for price
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={`${
            isPublished ? "bg-[#FDAB04] text-black" : "bg-[#FFD700] text-black"
          } hover:bg-[#FDAB04]/90`} // Bright colors for badges
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/instructor/courses/${row.original.id}/basic`}
        className="flex gap-2 items-center text-[#00BFFF] hover:text-[#1e90ff]"
      >
        <Pencil className="h-4 w-4" /> Edit
      </Link>
    ),
  },
];
