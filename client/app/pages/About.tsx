import { motion } from "framer-motion";
import {ProfileAndContact} from "@/app/components/ProfileAndContact";
import { aboutBoxes } from "@/app/data/content";

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
