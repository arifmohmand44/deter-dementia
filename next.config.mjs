/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable features
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**',
        }],
        formats: ['image/avif', 'image/webp'],
    },
    // Server Actions are now stable in Next.js 15
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', '@auth/prisma-adapter'],
        serverActions: {
            enabled: true
        },
        optimizePackageImports: ['react-icons'],
        turbo: {
            enabled: true
        }
    },
    // Improve loading performance
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Enable webpack optimization
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "child_process": false,
                "fs": false,
                "net": false,
                "tls": false,
                "async_hooks": false,
            };
        }
        return config;
    },
    // Add recommended security headers
    headers: async() => [{
        source: '/:path*',
        headers: [
            { key: 'X-DNS-Prefetch-Control', value: 'on' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
    }, ],
};

export default nextConfig;