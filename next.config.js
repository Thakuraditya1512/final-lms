/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['media.graphassets.com', 'ap-south-1.graphassets.com']
    },
    webpack: (config) => {
        // Add polyfills for required features
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "core-js-pure/stable/object/assign": require.resolve("core-js-pure/stable/object/assign")
        };
        return config;
    }
};

module.exports = nextConfig;
