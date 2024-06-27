/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:8000", "localhost:8888", "localhost:3000","https://c3x9wg5s-8000.use.devtunnels.ms"]
        }
    }
};

export default nextConfig;
