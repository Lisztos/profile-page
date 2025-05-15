import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-bold text-center capitalize mb-4 md:mb-6">
      {children}
    </h2>
  );
} 