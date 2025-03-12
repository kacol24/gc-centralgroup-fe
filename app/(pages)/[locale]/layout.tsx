import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Aboreto, Marcellus } from 'next/font/google';
import './../../globals.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ContactUs from '../../components/contact-us';
import { Suspense } from 'react';
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

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
  description: 'Building Your Dream Home',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as string)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${montserrat.className} ${marcellus.className} ${aboreto.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Suspense>
            <Navbar/>
          </Suspense>
          {children}
          <ContactUs/>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
