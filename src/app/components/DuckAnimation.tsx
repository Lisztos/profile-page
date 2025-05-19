"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DuckAnimation() {
  const [isQuacking, setIsQuacking] = useState(false);
  const duckSize = 60; // Size of the duck in pixels

  // Duck quacking handler
  const handleDuckClick = () => {
    if (!isQuacking) {
      setIsQuacking(true);

      // End quacking after animation
      setTimeout(() => {
        setIsQuacking(false);
      }, 1000);
    }
  };

  // Quack every 10 seconds
  useEffect(() => {
    const quackInterval = setInterval(() => {
      setIsQuacking(true);
      setTimeout(() => {
        setIsQuacking(false);
      }, 1500);
    }, 10000);

    return () => clearInterval(quackInterval);
  }, []);

  return (
    <div
      className={`fixed duck-animation ${isQuacking ? 'quacking' : ''}`}
      style={{
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        animation: isQuacking
          ? 'quack 0.2s infinite alternate'
          : 'duckWobble 3s infinite alternate ease-in-out',
        cursor: 'pointer',
      }}
      onClick={handleDuckClick}
    >
      <style jsx>{`
        @keyframes duckWobble {
          0% {
            transform: rotate(-2deg) translateY(0px);
          }
          100% {
            transform: rotate(2deg) translateY(-3px);
          }
        }

        @keyframes quack {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }

        .duck-animation {
          transform-origin: bottom center;
        }

        .quacking::after {
          content: 'Quack!';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 3px 6px;
          border-radius: 10px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
      <Image
        src="/images/duck.png"
        alt="Duck animation"
        width={duckSize}
        height={duckSize}
        unoptimized
        priority
      />
    </div>
  );
}