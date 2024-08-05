"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/custom/ComboBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "Subcategory is required",
  }),
});

interface CreateCourseFormProps {
  categories: {
    label: string; // name of category
    value: string; // categoryId
    subCategories: { label: string; value: string }[];
  }[];
}

const CreateCourseForm = ({ categories }: CreateCourseFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/instructor/courses/${response.data.id}/basic`);
      toast.success("Course successfully created!");
    } catch (err) {
      console.error("Error creating course", err);
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Set Up Your Course</h1>
      <p className="text-sm mb-6">
        Do not worry if you do not have all the details now. You can update them
        later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Web Development for Beginners"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <ComboBox options={categories} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <ComboBox
                    options={
                      categories.find(
                        (category) =>
                          category.value === form.watch("categoryId")
                      )?.subCategories || []
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              "Create Course"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
