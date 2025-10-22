"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ExperienceNavbar } from "../components/ExperienceNavbar";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { experiences as experienceEntries, ExperienceEntry } from "@/app/data/content";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

const seasonMonthMap: Record<string, number> = {
  spring: 2, // March
  summer: 5, // June
  fall: 8,   // September
  autumn: 8, // September
  winter: 11 // December
};
const monthIndexMap: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const extractYear = (value: string): number | undefined => {
  const match = value.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : undefined;
};

const parseDatePart = (part: string, fallbackYear?: number): Date => {
  const normalized = normalizeWhitespace(part);
  if (!normalized) {
    return new Date();
  }
  const lower = normalized.toLowerCase();
  if (lower.includes("present")) {
    return new Date();
  }
  for (const [season, month] of Object.entries(seasonMonthMap)) {
    if (lower.includes(season)) {
      const year = extractYear(normalized) ?? fallbackYear ?? new Date().getFullYear();
      return new Date(year, month, 1);
    }
  }
  const parsed = new Date(normalized);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }
  const monthKey = Object.keys(monthIndexMap).find((key) => lower.includes(key));
  if (monthKey) {
    const year = extractYear(normalized) ?? fallbackYear ?? new Date().getFullYear();
    return new Date(year, monthIndexMap[monthKey], 1);
  }
  if (fallbackYear !== undefined) {
    return new Date(fallbackYear, 0, 1);
  }
  const yearOnly = extractYear(normalized);
  if (yearOnly) {
    return new Date(yearOnly, 0, 1);
  }
  return new Date();
};

const parseDateRange = (dateRange: string): { start: Date; end: Date } => {
  const cleaned = dateRange.trim();
  if (!cleaned) {
    const now = new Date();
    return { start: now, end: now };
  }

  const parts = cleaned.split(/\s*[–—-]\s*/);
  if (parts.length === 1) {
    const singleDate = parseDatePart(parts[0]);
    return { start: singleDate, end: singleDate };
  }

  const [rawStart, ...rest] = parts;
  const rawEnd = rest.join(" ");
  const startDate = parseDatePart(rawStart);
  const endDate = parseDatePart(rawEnd, extractYear(rawEnd) ?? startDate.getFullYear());
  if (Number.isNaN(startDate.getTime())) {
    return { start: endDate, end: endDate };
  }
  if (Number.isNaN(endDate.getTime())) {
    return { start: startDate, end: startDate };
  }
  return startDate.getTime() <= endDate.getTime()
    ? { start: startDate, end: endDate }
    : { start: endDate, end: startDate };
};

const determineDominantYear = (start: Date, end: Date): number => {
  const startCursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const endCursor = new Date(end.getFullYear(), end.getMonth(), 1);
  const counts: Record<number, number> = {};

  while (startCursor <= endCursor) {
    const year = startCursor.getFullYear();
    counts[year] = (counts[year] || 0) + 1;
    startCursor.setMonth(startCursor.getMonth() + 1);
  }

  let dominantYear = start.getFullYear();
  let maxMonths = -1;
  Object.entries(counts).forEach(([yearStr, months]) => {
    const year = Number(yearStr);
    if (months > maxMonths) {
      maxMonths = months;
      dominantYear = year;
    } else if (months === maxMonths) {
      // Break ties by preferring the earlier year by default.
      dominantYear = Math.min(dominantYear, year);
    }
  });

  return dominantYear;
};
type ExperienceWithDates = ExperienceEntry & {
  startDate: Date;
  endDate: Date;
  dominantYear: number;
  isOngoing: boolean;
};

export const ProfessionalExperience: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("work-experience");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const experiences: ExperienceEntry[] = experienceEntries;
  const filteredExperiences = experiences.filter((exp) => exp.category === activeSection);

  const enrichedExperiences: ExperienceWithDates[] = filteredExperiences
    .map((exp) => {
      const { start, end } = parseDateRange(exp.dateRange);
      const isOngoing = /\bpresent\b/i.test(exp.dateRange);
      return {
        ...exp,
        startDate: start,
        endDate: end,
        dominantYear: determineDominantYear(start, end),
        isOngoing,
      };
    })
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  const experiencesByYear = enrichedExperiences.reduce<Record<string, ExperienceWithDates[]>>(
    (acc, exp) => {
      const bucket = exp.isOngoing ? "Present" : String(exp.dominantYear);
      if (!acc[bucket]) {
        acc[bucket] = [];
      }
      acc[bucket].push(exp);
      return acc;
    },
    {}
  );

  const yearEntries = Object.entries(experiencesByYear)
    .map(([label, items]) => ({
      label,
      items: items.sort((a, b) => b.endDate.getTime() - a.endDate.getTime()),
    }))
    .sort((a, b) => {
      if (a.label === "Present") return -1;
      if (b.label === "Present") return 1;
      return Number(b.label) - Number(a.label);
    });

  const toggleExpansion = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderExperienceCard = (exp: ExperienceWithDates) => (
    <motion.div
      key={exp.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        onClick={() => toggleExpansion(exp.id)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        aria-expanded={expandedIds.includes(exp.id)}
      >
        <div>
          {exp.category === "hackathons" ? (
            <>
              <h4 className="text-xl font-semibold text-gray-900">{exp.company}</h4>
              <p className="text-gray-600 italic">{exp.dateRange}</p>
            </>
          ) : (
            <>
              <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
              <p className="text-gray-600">
                <span className="font-medium">{exp.company}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="italic">{exp.dateRange}</span>
              </p>
            </>
          )}
        </div>
        <span className="text-light-primary">
          {expandedIds.includes(exp.id) ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {expandedIds.includes(exp.id) && (
        <div className="px-6 pb-6 space-y-4">
          {exp.description && <p className="text-gray-700">{exp.description}</p>}
          <div className="flex flex-wrap gap-2">
            {exp.tools.map((tool) => (
              <span
                key={tool}
                className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
          {exp.images && exp.images.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop
              speed={500}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="w-full rounded-md overflow-hidden"
            >
              {exp.images.map((imgSrc, i) => {
                const normalizedSrc = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
                return (
                  <SwiperSlide key={i}>
                    <div className="relative h-72 w-full bg-gray-50">
                      <Image
                        src={normalizedSrc}
                        alt={`${exp.company} - image ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 40vw"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      )}
    </motion.div>
  );

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
      <div className="mt-12 w-full max-w-5xl text-left">
        {yearEntries.length === 0 ? (
          <p className="text-gray-600">No experiences to show for this category yet.</p>
        ) : (
          <VerticalTimeline lineColor="#0ea5e9">
            {yearEntries.map(({ label, items }) => (
              <VerticalTimelineElement
                key={label}
                date={label}
                dateClassName="text-light-primary font-semibold text-lg"
                iconStyle={{
                  background: "#0ea5e9",
                  color: "#fff",
                  width: "28px",
                  height: "28px",
                  marginLeft: "-14px",
                  marginTop: "8px",
                  boxShadow: "0 0 0 4px #fff",
                }}
                contentStyle={{ background: "transparent", boxShadow: "none", padding: "0" }}
                contentArrowStyle={{ borderRight: "7px solid transparent" }}
              >
                <div className="space-y-6">{items.map((exp) => renderExperienceCard(exp))}</div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        )}
      </div>
    </section>
  );
};
