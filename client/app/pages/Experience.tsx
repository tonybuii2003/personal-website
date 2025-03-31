"use client";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Experience {
  id: number;
  position: string;
  company: string;
  dateRange: string;
  tools: string[];
  description?: string;
  images?: string[]; // Array of image URLs
}

export const ProfessionalExperience: React.FC = () => {
  // Example data. Replace with your own images and info.
  const experiences: Experience[] = [
    {
      id: 1,
      position: "Research Data Scientist",
      company: "SUNY Research Foundation",
      dateRange: "Aug 2024 – Present",
      tools: ["Python","R", "Bash", "PyQt", "SPSS", "Jenkins", "Docker", "RedHat Linux", "RAPIDS"],
      description: "Developing machine learning data analysis pipelines, automation applications and helped psychologists to gain deep behavioral insights",
      images: [
        "/suny_1.jpg",
      ],
    },
    {
      id: 2,
      position: "Software Engineering Internship",
      company: "The World Well-Being Project",
      dateRange: "Summer 2024",
      tools: ["Python", "TypeScript", "Bash", "Pandas", "DLATK","AngularJS", "Flask", "MYSQL", "Linux"],
      description: "Assisted NLP and PSY researchers by developing AngularJS and Android apps for data collection, integrating an ETL pipeline, preprocessed complex medical data, and maintained MYSQL and Jenkins CI/CD",
      images: [
        "/wwbp.png",
      ],
    },
    {
      id: 3,
      position: "Client Support Technician",
      company: "Division of Information Technology",
      dateRange: "Aug 2023 – May 2024",
      tools: ["Powershell", "Windows"],
      description: "Improved and maintained printer networks, facuty and student devices. Assisted students and facuty resolved software issues",
      images: [
        "/sbu_logo.webp",
      ],
    },
    {
        id: 4,
        position: "Backend Developer",
        company: "Morgan Stanley's Code to Give Hackathon",
        dateRange: "Spring 2023",
        tools: ["JavaScript", "Firebase", "Axios"],
        description: "Built a food bank admin system with virsualization",
        images: [
          "/hack-to-give.png",
        ],
    },
    {
        id: 5,
        position: "Research Assistant",
        company: "Blockchain Business Lab",
        dateRange: "Aug 2023 – May 2024",
        tools: ["Python", "Pandas", "BeautifulSoup"],
        description: "Build data pipelines for Blockchain market research",
        images: [
          "/bbl.jpg",
        ],
    },
    
  ];

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

      {/* Experiences Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {experiences.map((exp) => (
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
                    <img
                      src={imgSrc}
                      alt={`${exp.position} - image ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
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
