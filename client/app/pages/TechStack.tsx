"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FaReact, FaPython, FaCss3Alt, FaJsSquare, FaJava, FaNode, FaLinux, FaJenkins, FaAndroid, FaDocker} from "react-icons/fa";
import { SiTypescript, SiKotlin, SiGnubash, SiMongodb, SiExpress, SiApache, SiFirebase, SiTailwindcss, SiPandas, SiScikitlearn, SiNumpy, SiPytorch, SiNeovim} from "react-icons/si";
import { AiFillCode } from "react-icons/ai";
import { RiNextjsLine } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { VscVscode } from "react-icons/vsc";

type TechSkill = {
  icon: JSX.Element;
  name: string;
};

const techSkills: TechSkill[] = [
  { icon: <FaPython className="text-yellow-500 text-xl" />, name: "Python" },
  { icon: <FaJava className="text-red-500 text-xl" />, name: "Java" },
  { icon: <FaJsSquare className="text-yellow-400 text-xl" />, name: "JavaScript" },
  {icon: <SiTypescript className="text-blue-400 text-xl" />, name: "TypeScript"},
  {icon: <AiFillCode className="text-blue-400 text-xl" />, name: "C"},
  { icon: <SiKotlin className="text-purple-600 text-xl" />, name: "Kotlin" },
    { icon: <SiGnubash className="text-black text-xl" />, name: "Bash" },

  { icon: <FaCss3Alt className="text-orange-600 text-xl" />, name: "HTML" },
  { icon: <FaCss3Alt className="text-blue-700 text-xl" />, name: "CSS" },
  { icon: <FaReact className="text-blue-500 text-xl" />, name: "React.js" },
  { icon: <RiNextjsLine className="text-black text-xl" />, name: "Next.js" },
  { icon: <FaNode className="text-green-700 text-xl" />, name: "Node.js" },
  { icon: <SiExpress className="text-black text-xl" />, name: "Express.js" },
  { icon: <SiTailwindcss className="text-blue-500 text-xl" />, name: "Tailwind CSS" },
  
    { icon: <SiMongodb className="text-green-500 text-xl" />, name: "MongoDB" },
    { icon: <SiFirebase className="text-yellow-600 text-xl" />, name: "Firebase" },
    { icon: <GrMysql className="text-blue-400 text-xl" />, name: "MySQL" },
    { icon: <SiApache className="text-red-600 text-xl" />, name: "Apache" },
    { icon: <FaLinux className="text-black text-xl" />, name: "Linux" },
    { icon: <FaJenkins className="text-red-800 text-xl" />, name: "Jenkins" },
    { icon: <FaDocker className="text-blue-500 text-xl" />, name: "Docker" },
    
    { icon: <FaAndroid className="text-green-500 text-xl" />, name: "Android SDK" },
    { icon: <SiPandas className="text-yellow-500 text-xl" />, name: "Pandas" },
    { icon: <SiNumpy className="text-blue-500 text-xl" />, name: "Numpy" },
    { icon: <SiScikitlearn className="text-orange-500 text-xl" />, name: "Scikit-learn" },
    { icon: <SiPytorch className="text-red-500 text-xl" />, name: "Pytorch" },
    { icon: <VscVscode className="text-blue-500 text-xl" />, name: "VS Code" },
    { icon: <SiNeovim className="text-green-700 text-xl" />, name: "Neovim" },



];

const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

export const TechStack: React.FC = () => {
  const techSkillChunks = chunkArray<TechSkill>(techSkills, 7);

  return (
    <div id="tech-stack" className="flex flex-col items-center justify-center w-full py-16 px-4 bg-blue-500 overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Technologies I Use</h2>

      <Swiper
        spaceBetween={20} 
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={5000}
        modules={[Autoplay]}
        className="w-full max-w-5xl"
      >
        {techSkillChunks.map((chunk, index) => (
          <SwiperSlide key={index} className="w-auto flex-shrink-0">
            <div className="flex justify-center gap-x-6"> {/* Ensures even gap between items */}
              {chunk.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-md whitespace-nowrap"
                >
                  <div className="mr-2">{tech.icon}</div>
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
