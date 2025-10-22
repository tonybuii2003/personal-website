"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  githubOwner,
  ignoredRepos,
  languageColorMap,
  pinnedRepos,
  placeholderRepoImage,
} from "@/app/data/content";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  commit_count: number;
  image_url: string;
}

const getColorForLanguage = (language: string): string => {
  return languageColorMap[language] || "#cccccc";
};

const owner = githubOwner;
const placeholderImage = placeholderRepoImage;

const buildFallbackRepos = (): Repo[] =>
  pinnedRepos.map((name, index) => ({
    id: Number.MAX_SAFE_INTEGER - index,
    name,
    html_url: `https://github.com/${owner}/${name}`,
    description: "GitHub API is unavailable. Visit the repository for details.",
    language: null,
    stargazers_count: 0,
    commit_count: 0,
    image_url: placeholderImage,
  }));

const decodeBase64Readme = (encoded: string) => {
  try {
    const normalized = encoded.replace(/\s/g, "");
    if (typeof atob === "function") {
      return atob(normalized);
    }
    const bufferCtor = typeof globalThis !== "undefined" ? (globalThis as any).Buffer : undefined;
    if (bufferCtor) {
      return bufferCtor.from(normalized, "base64").toString("utf-8");
    }
  } catch {
    // ignore decode errors and fall back to empty string
  }
  return "";
};

const disqualifyImage = (url: string) => {
  const lowered = url.toLowerCase();
  return (
    lowered.includes("shields.io") ||
    lowered.includes("badgen.net") ||
    lowered.includes("badge.svg") ||
    lowered.includes("coveralls") ||
    lowered.includes("circleci") ||
    lowered.includes("travis-ci") ||
    lowered.endsWith(".svg")
  );
};

const allowedExtensions = /\.(png|jpe?g|gif|webp|bmp|avif|apng|mp4|mov|webm)(\?|#|$)/i;

const normalizeImagePath = (imagePath: string, repoName: string, defaultBranch: string) => {
  const trimmed = imagePath.split(" ")[0].trim().replace(/^<|>$/g, "");
  if (!trimmed) {
    return null;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    if (disqualifyImage(trimmed) || !allowedExtensions.test(trimmed)) {
      return null;
    }
    if (trimmed.includes("github.com") && trimmed.includes("/blob/")) {
      const rawUrl = trimmed.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
      return rawUrl;
    }
    return trimmed;
  }
  if (!allowedExtensions.test(trimmed)) {
    return null;
  }
  const normalizedPath = trimmed.replace(/^(\.\/)+/, "").replace(/^\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repoName}/${defaultBranch}/${normalizedPath}`;
};

const extractImageUrl = (readme: string, repoName: string, defaultBranch: string) => {
  const markdownMatches = [...readme.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map((match) => match[1]);
  const htmlMatches = [...readme.matchAll(/<img [^>]*src=["']([^"']+)["']/gi)].map((match) => match[1]);
  const candidates = [...markdownMatches, ...htmlMatches];
  for (const candidate of candidates) {
    const normalized = normalizeImagePath(candidate, repoName, defaultBranch);
    if (normalized) {
      return normalized;
    }
  }
  return null;
};

const fetchReadmeImage = async (
  repo: any,
  primaryHeaders: HeadersInit,
  fallbackHeaders: HeadersInit,
  canRetryUnauthed: boolean
) => {
  try {
    const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo.name}/readme`, {
      headers: primaryHeaders,
    });
    let responseToUse = readmeResponse;
    if (!readmeResponse.ok && canRetryUnauthed && (readmeResponse.status === 401 || readmeResponse.status === 403)) {
      const retryResponse = await fetch(`https://api.github.com/repos/${owner}/${repo.name}/readme`, {
        headers: fallbackHeaders,
      });
      responseToUse = retryResponse.ok ? retryResponse : readmeResponse;
    }
    const branch = repo.default_branch ?? "main";
    if (!responseToUse.ok) {
      const rawReadmeResponse = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo.name}/${branch}/README.md`
      );
      if (!rawReadmeResponse.ok) {
        return null;
      }
      const rawReadme = await rawReadmeResponse.text();
      return extractImageUrl(rawReadme, repo.name, branch);
    }
    const readmeData = await responseToUse.json();
    if (!readmeData?.content) {
      return null;
    }
    const readme = decodeBase64Readme(readmeData.content);
    return extractImageUrl(readme, repo.name, branch);
  } catch (error) {
    console.error(`Error fetching README for ${repo.name}:`, error);
    return null;
  }
};

export const Project: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reposPerPage = 3;

  useEffect(() => {
  const fetchRepos = async () => {
        try {
          const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
          const hasToken = Boolean(token && token !== "undefined" && token !== "null");
          const baseHeaders: HeadersInit = { Accept: "application/vnd.github+json" };
          const authedHeaders: HeadersInit = hasToken ? { ...baseHeaders, Authorization: `token ${token}` } : baseHeaders;

          const fetchWithFallback = async (url: string) => {
            let res = await fetch(url, { headers: authedHeaders });
            if (!res.ok && hasToken && (res.status === 401 || res.status === 403)) {
              const retry = await fetch(url, { headers: baseHeaders });
              if (retry.ok) {
                return retry;
              }
            }
            return res;
          };

          const response = await fetchWithFallback(`https://api.github.com/users/${owner}/repos`);
          if (!response.ok) {
            console.error("Failed to fetch repositories:", response.status, response.statusText);
            setRepos(buildFallbackRepos());
            return;
          }
          const data = await response.json();
          if (!Array.isArray(data)) {
            console.error("Unexpected response when fetching repositories:", data);
            setRepos(buildFallbackRepos());
            return;
          }
      
          const enrichedRepos = await Promise.all(
            data
            .filter((repo: any) => !ignoredRepos.includes(repo.name))
            .map(async (repo: any) => {
              // Fetch commit count for each repo
              const commitResponse = await fetchWithFallback(
                `https://api.github.com/repos/${owner}/${repo.name}/commits?per_page=1`
              );
              const commitPayload = commitResponse.ok ? await commitResponse.json() : [];
              const commitCount = commitResponse.headers.get("Link")?.includes('rel="last"')
                ? parseInt(commitResponse.headers.get("Link")?.match(/&page=(\d+)>; rel="last"/)?.[1] || "0", 10)
                : Array.isArray(commitPayload) ? commitPayload.length : 0;
              const githubPreview = `https://opengraph.githubassets.com/1/${owner}/${repo.name}`;
              const readmeImage =
                (await fetchReadmeImage(repo, authedHeaders, baseHeaders, hasToken)) ??
                (hasToken ? await fetchReadmeImage(repo, baseHeaders, baseHeaders, false) : null);
              const imageUrl = readmeImage ?? githubPreview ?? placeholderImage;
      
              return {
                id: repo.id,
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                language: repo.language,
                stargazers_count: repo.stargazers_count,
                commit_count: commitCount,
                image_url: imageUrl,
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
          setRepos(buildFallbackRepos());
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto">
          {currentRepos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex flex-col h-full transition-shadow hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={repo.image_url}
                  alt={`${repo.name} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  unoptimized={!repo.image_url.startsWith("/")}
                />
              </div>
              <div className="flex flex-col gap-4 p-6 text-left flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">{repo.name}</h3>
                <p className="text-gray-600 flex-1">{repo.description || "No description available"}</p>

                {/* Language visualization */}
                <div className="flex items-center space-x-2">
                  {repo.language && (
                    <>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
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
              </div>
            </motion.a>
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
