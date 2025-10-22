import React, { useEffect, useState } from 'react';
import { navLinks } from '@/app/data/content';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const { pathname } = window.location;
      setCurrentPath(pathname);
    }
  }, [mounted]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted || currentPath === null) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#FBFCFD]">
      <div className="flex items-center">
        <ul className="flex gap-4 md:gap-8 ml-4 md:ml-8 font-sm md:font-medium text-[#5A666E]">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <span
                onClick={() => scrollToSection(link.id)}
                className="cursor-pointer"
              >
                {link.label}
              </span>
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
                  currentPath === `#${link.id}` ? 'scale-x-100' : ''
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        
      </div>
    </nav>
  );
};
