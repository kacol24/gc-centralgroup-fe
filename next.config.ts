import {withSentryConfig} from '@sentry/nextjs';
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
                hostname: 'api.centralgroup.id',
                port: '',
                pathname: '**',
                search: '',
            },
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
export default withSentryConfig(withNextIntl(nextConfig), {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "goodcommerce-4g",
project: "centralgroup-fe",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});
