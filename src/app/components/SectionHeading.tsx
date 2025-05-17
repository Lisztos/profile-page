import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-bold text-center capitalize mb-10 md:mb-8">
      {children}
    </h2>
  );
}