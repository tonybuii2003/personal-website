"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { techSkills, TechSkill } from "@/app/data/content";

const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

export const TechStack: React.FC = () => {
  const [chunkSize, setChunkSize] = useState(7);
  const updateChunkSize = () => {
    const width = window.innerWidth;
    if (width >= 1024) setChunkSize(7); // Large screens
    else if (width >= 768) setChunkSize(5); // Tablets
    else setChunkSize(3); // Mobile
  };
  useEffect(() => {
    updateChunkSize(); // Set initial chunk size
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);
  const techSkillChunks = chunkArray<TechSkill>(techSkills, chunkSize);

  return (
    <div id="tech-stack" className="flex flex-col items-center justify-center w-full py-16 px-4 bg-blue-500 overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Technologies I Use</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={500}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        className="w-full max-w-5xl custom-swiper"
      >
        {techSkillChunks.map((chunk, index) => (
          <SwiperSlide key={index} className="w-auto flex-shrink-0">
            <div className="flex justify-center gap-x-6">
              {chunk.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-md whitespace-nowrap"
                >
                  <div className="mr-2">
                    <tech.Icon className={tech.iconClassName} />
                  </div>
                  <span className="text-sm font-semibold text-black">{tech.name}</span>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
