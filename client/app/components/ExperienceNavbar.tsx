"use client";
import React, { useState } from "react";

interface ExperienceNavbarProps {
  onSectionChange: (sectionId: string) => void;
}

export const ExperienceNavbar: React.FC<ExperienceNavbarProps> = ({ onSectionChange }) => {
  const navItems = [
    { id: "work-experience", label: "Work Experience" },
    { id: "hackathons", label: "Hackathons" },
    { id: "mentorship-leadership", label: "Mentorship/Leadership" },
  ];

  const [activeItem, setActiveItem] = useState<string>("work-experience");

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    onSectionChange(id);
  };

  return (
    <nav className="bg-[#FBFCFD] px-8 py-4">
      <ul className="flex justify-center gap-4 md:gap-8 font-sm md:font-medium text-[#5A666E]">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <span onClick={() => handleItemClick(item.id)} className="cursor-pointer">
              {item.label}
            </span>
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 transition-all duration-300 origin-left ${
                activeItem === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
