import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Aboreto, Marcellus } from 'next/font/google';
import './globals.css';
import GraphqlProvider from '@/components/GraphqlProvider';
import { getLocale } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const marcellus = Marcellus({ subsets: ['latin'], weight: '400' });
const aboreto = Aboreto({ subsets: ['latin'], weight: '400' });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Central Group',
  description: 'We Build Your Dream Home',
  icons: [
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png?v=202506021107' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png?v=202506021107' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png?v=202506021107' },
  ],
  manifest: '/site.webmanifest?v=202506021107',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <GraphqlProvider token={accessToken}>
        <body
          className={`${geistSans.className} ${geistMono.variable} ${montserrat.className} ${marcellus.className} ${aboreto.className} antialiased`}
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </body>
      </GraphqlProvider>
    </html>
  );
}
