import Image from "next/image";
import { motion } from "framer-motion";
import {ProfileAndContact} from "@/app/components/ProfileAndContact";
const aboutBoxes = [
    {
        intro: "I am a...",
        title: "Mentor",
        description: "I've been known to be the voice that rallies team members towards our shared goals",
        bgColor: "#FFFAE3", // Light yellow
        introColor: "#A89E2A", // Mid yellow
        titleColor: "#7C6A00", // Dark yellow
        descColor: "#A89E2A", // Light yellow
    },
    {
        intro: "I am a...",
        title: "Tech Enthusiast",
        description: "I'm driven by my passion for technology and its ability to transform the world.",
        bgColor: "#FFE3E3", // Light red
        introColor: "#D9534F", // Mid red
        titleColor: "#A83232", // Dark red
        descColor: "#D9534F", // Light red
    },
    {
        intro: "I am a...",
        title: "Quick Learner",
        description: "I'm highly adaptive to new environment. I love tackling complex challenges and finding innovative solutions, I can apply my past experiences to new problems.",
        bgColor: "#E3F5FF", // Light blue
        introColor: "#007ACC", // Mid blue
        titleColor: "#005B99", // Dark blue
        descColor: "#007ACC", // Light blue
    },
    {
        intro: "I am a...",
        title: "Entrepreneur",
        description: "I'm on my journey to build a software company that will help people in need. Currently working on Loqi, A platform leverages the latest technology to enhance your studying experience with personalized and interactive learning tools",
        bgColor: "#E3FFE3", // Light green
        introColor: "#3C9A3C", // Mid green
        titleColor: "#2A7A2A", // Dark green
        descColor: "#3C9A3C", // Light green
    },
];

export const About: React.FC = () => {
    return (
        <div id="about-me" className="min-h-screen bg-[#FBFCFD] flex flex-col items-center justify-center md:pt-1 pt-5">
            <div className="container mx-auto px-4">
                {/* Text Section and Boxes */}
                <div className="flex flex-col md:flex-row items-center">
                    
                    {/* Text Section */}
                    <div className="md:w-1/2 mb-8 mt-12 md:mb-0 flex flex-col items-center">
                        

                        {/* Introductory Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center md:text-left "
                        >
                            
                            <span className="text-light-primary text-base font-semibold mb-2">
                                Hi there, I am Long <span className="font-normal">(Tony)</span> Bui
                            </span>
                            
                            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                                Welcome to my<span className="text-light-primary"> Portfolio!!!</span>
                            </h1>
                            <p className="text-gray-600 mb-6 md:w-3/4">
                                I invite you to explore my coding journey and connect with me for collaborative opportunities or tech conversations!
                            </p>
                            <div className="mb-8 md:mb-0 md:mr-8">
                                <ProfileAndContact />
                            </div>
                        </motion.div>
                        
                    </div>

                    {/* Boxes Section */}
                    <div className="md:w-1/2 mt-8 md:mt-0 grid grid-cols-2 gap-4">
                        {aboutBoxes.map((box, i) => (
                            <motion.div
                                key={i}
                                className="p-6 rounded-xl shadow-lg flex flex-col items-center"
                                style={{ backgroundColor: box.bgColor }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                            >
                                <div className="text-base font-semibold mb-2" style={{ color: box.introColor }}>
                                    {box.intro}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: box.titleColor }}>
                                    {box.title}
                                </h2>
                                <p className="mb-6 text-center" style={{ color: box.descColor }}>
                                    {box.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
