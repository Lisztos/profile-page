"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function Card({ children, id, className = "" }: CardProps) {
  return (
    <div
      id={id}
      className={`relative w-full rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-md border border-black/10 dark:border-white/10 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
