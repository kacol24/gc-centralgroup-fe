import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
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
                protocol: 'https',
                hostname: 'centralgroup.goodcommerce.co',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
