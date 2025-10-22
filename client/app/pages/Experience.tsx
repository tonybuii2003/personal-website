"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ExperienceNavbar } from "../components/ExperienceNavbar";
import { experiences as experienceEntries, ExperienceEntry } from "@/app/data/content";
import "swiper/css";
import "swiper/css/pagination";

const seasonMonthMap: Record<string, number> = {
  spring: 2, // March
  summer: 5, // June
  fall: 8,   // September
  autumn: 8, // September
  winter: 11 // December
};
/**
 * Parses the end date from a dateRange string.
 * Assumes dateRange is in one of these formats:
 *   "Aug 2024 – Present"  => returns new Date() for Present.
 *   "Aug 2023 – May 2024"  => returns Date for "May 2024"
 *   "Summer 2024"        => returns Date from mapped season (e.g., June 2024).
 */
function parseEndDate(dateRange: string): Date {
  let endPart = "";
  if (dateRange.includes("–")) {
    const parts = dateRange.split("–");
    endPart = parts[1].trim();
  } else {
    endPart = dateRange.trim();
  }

  // If "Present", return current date.
  if (endPart.toLowerCase().includes("present")) {
    return new Date();
  }

  // Check for season keywords.
  const lowerEnd = endPart.toLowerCase();
  for (const season in seasonMonthMap) {
    if (lowerEnd.includes(season)) {
      // Extract the year from the string.
      const yearMatch = endPart.match(/\d{4}/);
      const year = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();
      return new Date(year, seasonMonthMap[season]);
    }
  }

  // Otherwise, try to create a Date directly.
  const parsedDate = new Date(endPart);
  // If the parsed date is invalid, fallback to current date.
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}
export const ProfessionalExperience: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("work-experience");
  const experiences: ExperienceEntry[] = experienceEntries;
  const filteredExperiences = experiences.filter(
    (exp) => exp.category === activeSection
  );
  const sortedExperiences = filteredExperiences.sort((a, b) => {
    const dateA = parseEndDate(a.dateRange).getTime();
    const dateB = parseEndDate(b.dateRange).getTime();
    return dateB - dateA;
  });
  return (
    <section
      id="experience"
      className="min-h-screen container mx-auto py-16 px-4 flex flex-col items-center text-center"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-blue-600 text-base font-semibold mb-2 uppercase">
          Experience
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          What Have I Done?
        </h1>
      </motion.div>
      <ExperienceNavbar onSectionChange={setActiveSection} />
      {/* Render the filtered experiences */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {sortedExperiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="bg-white rounded-lg p-6 shadow-md text-left"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Position & Company */}
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {exp.position}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">{exp.company}</span> &middot;{" "}
              <span className="italic">{exp.dateRange}</span>
            </p>

            {/* Description */}
            {exp.description && (
              <p className="text-gray-700 mb-3">{exp.description}</p>
            )}

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Images Carousel (Swiper) */}
            {exp.images && exp.images.length > 0 && (
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                speed={500}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="w-full rounded-md overflow-hidden"
              >
                {exp.images.map((imgSrc, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-72 w-144 flex items-center justify-center">

                    <img
                      src={imgSrc}
                      alt={`${exp.position} - image ${i + 1}`}
                      className="object-contain"
                    />
                    </div>
                    
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
