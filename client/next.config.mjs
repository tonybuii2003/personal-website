/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/client",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
