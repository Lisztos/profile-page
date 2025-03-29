import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-bold text-center capitalize mb-8 md:mb-10">
      {children}
    </h2>
  );
} 