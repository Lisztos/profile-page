"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function Card({ children, id, className = "" }: CardProps) {
  const sectionStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    position: 'relative' as const
  };

  return (
    <div
      id={id}
      className={`relative w-full rounded-lg bg-white text-gray-900 p-8 shadow-lg overflow-hidden ${className}`}
      style={sectionStyle}
    >
      {children}
    </div>
  );
}