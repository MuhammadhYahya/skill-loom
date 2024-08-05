"use client";

import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  const onClick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };

  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onClick(null)}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onClick(category.id)}
          className={`${
            selectedCategory === category.id
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } transition-colors duration-300`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
