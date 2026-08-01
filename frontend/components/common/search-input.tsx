"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
}: Props) {
  return (
    <div className="relative w-full max-w-sm">

      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />

      <Input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="pl-10"
      />

    </div>
  );
}