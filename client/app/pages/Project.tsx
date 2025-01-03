"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  commit_count: number;
}

const getColorForLanguage = (language: string): string => {
  const colors: { [key: string]: string } = {
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
  return colors[language] || "#cccccc";
};

const pinnedRepos = ["SBUHacks2024", "WasteNoBites", "Cinemania", "votifier", "loqi", "StudyBuddy"];
const ignoredRepos = ["tonybuii2003", "HW7-CYOAPI-Part-3", "HW6_OwnAPIPart2", "HW1-HelloSquirrel", "HackMit21-Goat", "HW2-Debugathon", "HW5-OwnAPI", "CodeMath", "HelloWorldAND102", "HW3-AnimalsApp", "and102-lab4-starter", "and102-lab3-starter"];

export const Project: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reposPerPage = 3;

  useEffect(() => {
    const fetchRepos = async () => {
        try {
          const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; 
          const response = await fetch("https://api.github.com/users/tonybuii2003/repos", {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const data = await response.json();
      
          const enrichedRepos = await Promise.all(
            data
            .filter((repo: any) => !ignoredRepos.includes(repo.name))
            .map(async (repo: any) => {
              // Fetch commit count for each repo
              const commitResponse = await fetch(
                `https://api.github.com/repos/tonybuii2003/${repo.name}/commits?per_page=1`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                  },
                }
              );
              const commitData = await commitResponse.json();
              const commitCount = commitResponse.headers.get("Link")?.includes('rel="last"')
                ? parseInt(commitResponse.headers.get("Link")?.match(/&page=(\d+)>; rel="last"/)?.[1] || "0", 10)
                : commitData.length;
      
              return {
                id: repo.id,
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                language: repo.language,
                stargazers_count: repo.stargazers_count,
                commit_count: commitCount,
              };
            })
          );
      
          // Sort repos by pinned status, then stars, then commit count
          enrichedRepos.sort((a, b) => {
            const isPinnedA = pinnedRepos.includes(a.name);
            const isPinnedB = pinnedRepos.includes(b.name);
      
            if (isPinnedA !== isPinnedB) {
              return isPinnedA ? -1 : 1;
            }
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return b.commit_count - a.commit_count;
          });
      
          setRepos(enrichedRepos);
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      };
      
    fetchRepos();
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * reposPerPage < repos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * reposPerPage;
  const currentRepos = repos.slice(startIndex, startIndex + reposPerPage);

  return (
    <div id="projects" className="min-h-screen container mx-auto flex flex-col justify-center items-center py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-light-primary text-base font-semibold mb-2">Projects</h2>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">My GitHub Repositories</h1>
      </motion.div>

      {/* Container for Grid and Buttons */}
      <div className="relative w-full max-w-5xl flex items-center mt-8">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`absolute left-[-2rem] p-2 z-10 rounded-full ${currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          <FaArrowLeft className="text-2xl" />
        </button>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
          {currentRepos.map((repo) => (
            <motion.div
              key={repo.id}
              className="bg-white rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h3>
              <p className="text-gray-600 mb-4">{repo.description || "No description available"}</p>

              {/* Language visualization */}
              <div className="flex items-center space-x-2 mb-4">
                {repo.language && (
                  <>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: getColorForLanguage(repo.language),
                      }}
                    ></div>
                    <span className="text-gray-500 text-sm">{repo.language}</span>
                  </>
                )}
              </div>

              {/* Stars and Commits */}
              <div className="flex justify-between text-gray-700 text-sm">
                <span>⭐ {repo.stargazers_count} stars</span>
                <span>🔄 {repo.commit_count} commits</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * reposPerPage >= repos.length}
          className={`absolute right-[-2rem] p-2 z-10 rounded-full ${(currentPage + 1) * reposPerPage >= repos.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
