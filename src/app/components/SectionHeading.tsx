"use client";

import React from "react";

export default function SectionHeading({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <h2 className={`text-3xl font-medium capitalize mb-8 ${align === "left" ? "text-left" : "text-center"}`}>
      {children}
    </h2>
  );
}