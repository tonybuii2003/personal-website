import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact } from 'react-icons/fa';
import { GrNotes } from "react-icons/gr";

export const ProfileAndContact: React.FC = () => {
    return (
        <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* Profile Image and Contact Section */}
            <div className="flex flex-row items-left space-x-8">
                {/* Profile Image */}
                <div>
                    <Image
                        src="/profile.png"
                        alt="Profile Image"
                        width={175}
                        height={175}
                        className="rounded-full border-4 border-light-primary"
                    />
                </div>

                {/* Contact Section */}
                <div className="flex flex-col space-y-3 text-gray-700">
                    <Link href="https://github.com/tonybuii2003" target="_blank" className="flex items-center space-x-2">
                        <FaGithub className="text-2xl hover:text-gray-900 transition-colors duration-200" />
                        <span className="text-lg hover:underline">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com/in/tonybui2003" target="_blank" className="flex items-center space-x-2">
                        <FaLinkedin className="text-2xl hover:text-gray-900 transition-colors duration-200" />
                        <span className="text-lg hover:underline">LinkedIn</span>
                    </Link>
                    <Link href="mailto:tonybui5503@gmail.com" target="_blank" className="flex items-center space-x-2">
                        <FaEnvelope className="text-2xl hover:text-gray-900 transition-colors duration-200" />
                        <span className="text-lg hover:underline">Email</span>
                    </Link>
                    {/* <Link href="https://reactjs.org" target="_blank" className="flex items-center space-x-2">
                        <GrNotes className="text-2xl hover:text-blue-600 transition-colors duration-200" />
                        <span className="text-lg hover:underline">Resume</span>
                    </Link> */}
                    
                </div>
            </div>
        </div>
    );
};
