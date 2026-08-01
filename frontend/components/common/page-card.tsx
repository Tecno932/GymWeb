"use client";

import { ReactNode } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  children: ReactNode;
}

export function PageCard({
  children,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}