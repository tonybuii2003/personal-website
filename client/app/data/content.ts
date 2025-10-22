import { IconType } from "react-icons";
import { FaAndroid, FaCss3Alt, FaDocker, FaJava, FaJenkins, FaJsSquare, FaLinux, FaNode, FaProjectDiagram, FaPython, FaReact } from "react-icons/fa";
import { AiFillCode } from "react-icons/ai";
import { GrMysql } from "react-icons/gr";
import { GiSoundWaves } from "react-icons/gi";
import {
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGnubash,
  SiGooglecloud,
  SiKotlin,
  SiLangchain,
  SiMongodb,
  SiNeovim,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPytorch,
  SiScikitlearn,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";

export type AboutBox = {
  intro: string;
  title: string;
  description: string;
  bgColor: string;
  introColor: string;
  titleColor: string;
  descColor: string;
};

export type NavLink = {
  id: string;
  label: string;
};

export type ExperienceNavItem = {
  id: string;
  label: string;
};

export type ExperienceEntry = {
  id: number;
  position: string;
  company: string;
  dateRange: string;
  tools: string[];
  description?: string;
  images?: string[];
  category: string;
};

export type TechSkill = {
  Icon: IconType;
  iconClassName: string;
  name: string;
};

export const aboutBoxes: AboutBox[] = [
  {
    intro: "I am a...",
    title: "Mentor",
    description:
      "I've been known to be the voice that rallies team members towards our shared goals",
    bgColor: "#FFFAE3",
    introColor: "#A89E2A",
    titleColor: "#7C6A00",
    descColor: "#A89E2A",
  },
  {
    intro: "I am a...",
    title: "Innovator",
    description:
      "I'm endlessly curious about emerging technologies and the possibilities they unlock for people.",
    bgColor: "#FFE3E3",
    introColor: "#D9534F",
    titleColor: "#A83232",
    descColor: "#D9534F",
  },
  {
    intro: "I am a...",
    title: "Quick Learner",
    description:
      "I'm highly adaptive to new environment. I love tackling complex challenges and finding innovative solutions, I can apply my past experiences to new problems.",
    bgColor: "#E3F5FF",
    introColor: "#007ACC",
    titleColor: "#005B99",
    descColor: "#007ACC",
  },
  {
    intro: "I am a...",
    title: "Entrepreneur",
    description:
      "I'm building ventures that make technology more accessible and equitable for people who need it most, exploring new ideas across education, health, and community support.",
    bgColor: "#E3FFE3",
    introColor: "#3C9A3C",
    titleColor: "#2A7A2A",
    descColor: "#3C9A3C",
  },
];

export const navLinks: NavLink[] = [
  { id: "about-me", label: "About Me" },
  { id: "tech-stack", label: "Technologies I Use" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const experienceNavItems: ExperienceNavItem[] = [
  { id: "work-experience", label: "Work Experience" },
  { id: "hackathons", label: "Hackathons" },
  { id: "mentorship-leadership", label: "Mentorship/Leadership" },
];

export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    position: "Research Data Scientist",
    company: "SUNY Research Foundation",
    dateRange: "Aug 2024 – May 2025",
    tools: ["Python", "R", "Bash", "PyQt", "SPSS", "Jenkins", "Docker", "RedHat Linux", "RAPIDS"],
    description:
      "Developing machine learning data analysis pipelines, automation applications and helped psychologists to gain deep behavioral insights",
    images: ["/suny_1.jpg"],
    category: "work-experience",
  },
  {
    id: 14,
    position: "Research AI Software Engineer",
    company: "Stanford HAI (Computational Psychology & Well-Being Lab)",
    dateRange: "Jun 2025 – Present",
    tools: ["Python", "PyTorch", "LangChain", "LangGraph", "FastAPI", "GCP", "OpenAI API", "ElevenLabs"],
    description:
      "Building evaluation-driven, human-centered NLP systems for mental health research, including RAG-enabled TherapyTrainer and cross-lab LLM safety evaluations.",
    images: [],
    category: "work-experience",
  },
  {
    id: 13,
    position: "Fullstack Software Engineer",
    company: "Vanderbilt CCC / Human Language Analysis Beings",
    dateRange: "Jul 2025 – Present",
    tools: ["TypeScript", "Next.js", "Python", "FastAPI", "LangChain", "GCP", "Docker"],
    description:
      "Leading full-stack development for behavioral analytics pipelines and SemEval infrastructure, ensuring multilingual LLM evaluation workflows scale reliably.",
    images: [],
    category: "work-experience",
  },
  {
    id: 2,
    position: "Software Engineering Internship",
    company: "The World Well-Being Project",
    dateRange: "Summer 2024",
    tools: ["Python", "TypeScript", "Bash", "Pandas", "DLATK", "AngularJS", "Flask", "MYSQL", "Linux"],
    description:
      "Assisted NLP and PSY researchers by developing AngularJS and Android apps for data collection, integrating an ETL pipeline, preprocessed complex medical data, and maintained MYSQL and Jenkins CI/CD",
    images: ["/wwbp.png"],
    category: "work-experience",
  },
  {
    id: 3,
    position: "Client Support Technician",
    company: "Division of Information Technology",
    dateRange: "Aug 2023 – May 2024",
    tools: ["Powershell", "Windows"],
    description:
      "Improved and maintained printer networks, facuty and student devices. Assisted students and facuty resolved software issues",
    images: ["/sbu_logo.webp"],
    category: "work-experience",
  },
  {
    id: 4,
    position: "Backend Developer",
    company: "Morgan Stanley's Code to Give Hackathon",
    dateRange: "Spring 2023",
    tools: ["JavaScript", "Firebase", "Axios"],
    description: "Built a food bank admin system with virsualization",
    images: ["/hack-to-give.png"],
    category: "hackathons",
  },
  {
    id: 5,
    position: "Research Assistant",
    company: "Blockchain Business Lab",
    dateRange: "Aug 2023 – May 2024",
    tools: ["Python", "Pandas", "BeautifulSoup"],
    description: "Build data pipelines for Blockchain market research",
    images: ["/bbl.jpg"],
    category: "work-experience",
  },
  {
    id: 6,
    position: "Participant - ML Modeling",
    company: "RoboTech",
    dateRange: "Feb 2022 - Feb 2022",
    tools: ["Python", "Pytorch", "OpenCV"],
    description:
      "Created an bottle/can image detection model for smart trashcan built for RoboTech Hackathon",
    images: ["robotech.jpg", "robotech2.JPG"],
    category: "hackathons",
  },
  {
    id: 15,
    position: "Participant",
    company: "HackMIT 2021 - ecoFit",
    dateRange: "Sep 2021",
    tools: ["Swift", "SwiftUI", "CoreLocation", "Firebase", "Figma"],
    description:
      "Developed ecoFit, an iOS app that rewards sustainable commuting by tracking activity, surfacing global challenges, and motivating users to bike, walk, or ride transit.",
    images: [],
    category: "hackathons",
  },
  {
    id: 7,
    position: "Participant - Frontend Developer",
    company: "HopperHack 2023: Winner - Best Community Hack",
    dateRange: "Spring 2023",
    tools: ["React.js", "JavaScript", "Material UI"],
    description:
      "Create an web app that seek to help students on campus find other study partners by providing the option to either create an online virtual group or connect with other students on campus to study in-person.",
    images: ["studybuddy.png"],
    category: "hackathons",
  },
  {
    id: 12,
    position: "Full Stack Engineer",
    company: "UC Berkeley AI Hackathon - UpStarter",
    dateRange: "Jun 2025",
    tools: ["Next.js", "TypeScript", "LangChain", "RAG", "Supabase", "OpenAI API"],
    description:
      "Built UpStarter, an all-in-one cofounder-matching platform with recommendation agents and RAG-powered onboarding to pair founders by skills, interests, and availability.",
    images: [],
    category: "hackathons",
  },
  {
    id: 8,
    position: "Participant - Frontend Developer",
    company: "SBUHacks 2024",
    dateRange: "Spring 2024",
    tools: ["React.js", "JavaScript", "Tailwind", "MongoDB", "OpenAI API"],
    description:
      "Created MindScribe to transform mental health with AI. Personalized companions for emotional support and growth, anytime. Choose your friend and elevate your journaling journey",
    images: ["mindscribes.png"],
    category: "hackathons",
  },
  {
    id: 10,
    position: "Mentor",
    company: "HackNYU 2025 - First Hack Winner",
    dateRange: "Spring 2025",
    tools: ["Mentorship"],
    description: "Helped a group of underclassmen win their first hackathon at HackNYU",
    images: ["mentor-hacknyu.jpg", "mentor-hacknyu2.jpg"],
    category: "mentorship-leadership",
  },
  {
    id: 9,
    position: "Mentor",
    company: "HopperHacks 2025 - Best AI/ML",
    dateRange: "Spring 2025",
    tools: ["Mentorship"],
    description: "Helped a group of underclassmen win their best AI/ML title at HopperHacks",
    images: ["mentor-hopperhack.jpeg", "mentor-hopperhack2.jpg"],
    category: "mentorship-leadership",
  },
  {
    id: 11,
    position: "Computer Vision Lead",
    company: "Stony Brook Robotics Team",
    dateRange: "Oct 2021 - May 2022",
    tools: ["Mentorship", "Python", "OpenCV"],
    description: "Lead a team of 20 members connect and keeping track of their tasks",
    images: ["robotcv-lead.jpeg"],
    category: "mentorship-leadership",
  },
];

export const techSkills: TechSkill[] = [
  { Icon: FaPython, iconClassName: "text-yellow-500 text-xl", name: "Python" },
  { Icon: FaJava, iconClassName: "text-red-500 text-xl", name: "Java" },
  { Icon: FaJsSquare, iconClassName: "text-yellow-400 text-xl", name: "JavaScript" },
  { Icon: SiTypescript, iconClassName: "text-blue-400 text-xl", name: "TypeScript" },
  { Icon: AiFillCode, iconClassName: "text-blue-400 text-xl", name: "C" },
  { Icon: SiKotlin, iconClassName: "text-purple-600 text-xl", name: "Kotlin" },
  { Icon: SiGnubash, iconClassName: "text-black text-xl", name: "Bash" },
  { Icon: FaCss3Alt, iconClassName: "text-orange-600 text-xl", name: "HTML" },
  { Icon: FaCss3Alt, iconClassName: "text-blue-700 text-xl", name: "CSS" },
  { Icon: FaReact, iconClassName: "text-blue-500 text-xl", name: "React.js" },
  { Icon: RiNextjsLine, iconClassName: "text-black text-xl", name: "Next.js" },
  { Icon: SiTailwindcss, iconClassName: "text-blue-500 text-xl", name: "Tailwind CSS" },
  { Icon: FaNode, iconClassName: "text-green-700 text-xl", name: "Node.js" },
  { Icon: SiExpress, iconClassName: "text-black text-xl", name: "Express.js" },
  { Icon: SiSpring, iconClassName: "text-green-500 text-xl", name: "Spring Boot" },
  { Icon: GrMysql, iconClassName: "text-blue-400 text-xl", name: "MySQL" },
  { Icon: SiLangchain, iconClassName: "text-purple-500 text-xl", name: "LangChain" },
  { Icon: FaProjectDiagram, iconClassName: "text-teal-500 text-xl", name: "LangGraph" },
  { Icon: GiSoundWaves, iconClassName: "text-pink-500 text-xl", name: "ElevenLabs" },
  { Icon: SiOpenai, iconClassName: "text-emerald-500 text-xl", name: "OpenAI API" },
  { Icon: SiFastapi, iconClassName: "text-emerald-600 text-xl", name: "FastAPI" },
  { Icon: SiMongodb, iconClassName: "text-green-500 text-xl", name: "MongoDB" },
  { Icon: SiFirebase, iconClassName: "text-yellow-600 text-xl", name: "Firebase" },
  { Icon: SiGooglecloud, iconClassName: "text-blue-500 text-xl", name: "GCP" },
  { Icon: FaLinux, iconClassName: "text-black text-xl", name: "Linux" },
  { Icon: FaJenkins, iconClassName: "text-red-800 text-xl", name: "Jenkins" },
  { Icon: FaDocker, iconClassName: "text-blue-500 text-xl", name: "Docker" },
  { Icon: FaAndroid, iconClassName: "text-green-500 text-xl", name: "Android SDK" },
  { Icon: SiPandas, iconClassName: "text-yellow-500 text-xl", name: "Pandas" },
  { Icon: SiNumpy, iconClassName: "text-blue-500 text-xl", name: "Numpy" },
  { Icon: SiScikitlearn, iconClassName: "text-orange-500 text-xl", name: "Scikit-learn" },
  { Icon: SiPytorch, iconClassName: "text-red-500 text-xl", name: "Pytorch" },
  { Icon: VscVscode, iconClassName: "text-blue-500 text-xl", name: "VS Code" },
  { Icon: SiNeovim, iconClassName: "text-green-700 text-xl", name: "Neovim" },
];

export const pinnedRepos = ["SBUHacks2024", "WasteNoBites", "Cinemania", "votifier", "loqi", "StudyBuddy", "dlatk", "UpStarter", "MindScribeAI"];

export const ignoredRepos = [
  "tonybuii2003",
  "HW7-CYOAPI-Part-3",
  "HW6_OwnAPIPart2",
  "HW1-HelloSquirrel",
  "HackMit21-Goat",
  "HW2-Debugathon",
  "HW5-OwnAPI",
  "CodeMath",
  "HelloWorldAND102",
  "HW3-AnimalsApp",
  "and102-lab4-starter",
  "and102-lab3-starter",
  "personal-website",
];

export const githubOwner = "tonybuii2003";

export const placeholderRepoImage = "/next.svg";

export const languageColorMap: Record<string, string> = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Ruby: "#701516",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  TypeScript: "#2b7489",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Kotlin: "#800080",
};
