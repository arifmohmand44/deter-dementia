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

    // Modern stable config
    serverExternalPackages: ['@prisma/client', '@auth/prisma-adapter'],

    experimental: {
        serverActions: {
            enabled: true
        },
        optimizePackageImports: ['react-icons'],
    },

    turbo: {
        enabled: true
    },

    // Output configuration for standalone build
    output: 'standalone',

    // Improve loading performance
    reactStrictMode: true,

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Enable webpack optimization
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        if (config.cache && !dev) {
            config.cache = Object.freeze({
                type: 'memory',
            });
        }
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

    eslint: {
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    // Add recommended security headers
    headers: async() => [{
        source: '/:path*',
        headers: [
            { key: 'X-DNS-Prefetch-Control', value: 'on' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
    }],
};

export default nextConfig;