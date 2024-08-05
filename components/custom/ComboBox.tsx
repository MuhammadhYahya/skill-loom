"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboBoxProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
}

export function ComboBox({ options, value, onChange }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          className="w-[200px] justify-between bg-white text-gray-800 border-gray-300 hover:border-gray-400 focus:border-blue-500"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border border-gray-300 rounded-md shadow-lg">
        <Command>
          <CommandInput
            className="border-b border-gray-300"
            placeholder="Search option..."
          />
          <CommandEmpty className="text-gray-500">
            No option found.
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onChange(option.value === value ? "" : option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors",
                  value === option.value
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                )}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value
                      ? "opacity-100 text-blue-500"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
