import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        // Modify the `config` object to add custom Webpack configuration

        // For example, to handle `.graphql` files:
        config.module.rules.push({
            test: /\.graphql$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'graphql-tag/loader',
                },
            ],
        });

        // Return the modified config
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'centralgroup.goodcommerce.co',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
