"use client";
import { Navbar } from "@/app/components/NavBar";
import {About} from "@/app/pages/About";
import {Project} from "@/app/pages/Project";
export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b bg-[#FBFCFD] overflow-auto no-scrollbar scroll-smooth">
      <div className="z-20 absolute top-0 left-0 w-screen">
        <Navbar />
      </div>
        <About />
        
        <Project />
    </div>
  );
}
