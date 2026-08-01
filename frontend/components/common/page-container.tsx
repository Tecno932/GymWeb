"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageContainer({
  children,
}: Props) {
  return (
    <div className="space-y-6">

      {children}

    </div>
  );
}