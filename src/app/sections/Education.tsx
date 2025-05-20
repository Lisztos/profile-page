"use client";

import React from "react";
import SectionHeading from "@/app/components/SectionHeading";
import Image from "next/image";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-28 max-w-[50rem] text-center leading-8 mx-auto mb-16">
      <SectionHeading>Education</SectionHeading>
      <div className="relative md:pl-24 text-left mt-12">
        {/* Logo circle */}
        <div className={
          `sm:absolute sm:left-0 sm:top-0 w-[74px] h-[74px] bg-white border-2 border-gray-200 rounded-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden ` +
          `relative mx-auto mb-2 sm:mx-0 sm:mb-0`
        }>
          <a
            href="https://www.tu.berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Visit TU Berlin website"
          >
            <Image src="/images/logos/tu-berlin.jpg" alt="TU Berlin" width={48} height={48} className="object-contain" />
          </a>
        </div>
        {/* Card content */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:text-left text-center flex flex-col items-center sm:items-start">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3 dark:bg-blue-900/30 dark:text-blue-400">
            2018 - 2022
          </span>
          <h3 className="text-xl font-bold mb-1 sm:text-left text-center w-full">B.Sc. Business Informatics (Wirtschaftsinformatik)</h3>
          <p className="mb-3 sm:text-left text-center w-full">
            <span className="font-bold text-lg text-gray-600 dark:text-gray-100">Technische Universität Berlin</span>
            <span className="text-gray-700 dark:text-gray-300"> • Berlin, Germany</span>
          </p>
          <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed list-disc sm:pl-5 pl-0 space-y-1 mb-1 sm:text-left text-center">
            Thesis: <i>Integrating Didcomm Messaging in ActivityPub-based Social Networks</i>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grade: 1.0</div>
          </div>
        </div>
      </div>
    </section>
  );
}