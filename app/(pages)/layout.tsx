import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Aboreto, Marcellus } from 'next/font/google';
import './../globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${montserrat.className} ${marcellus.className} ${aboreto.className} antialiased`}
      >
        <Navbar type="fixed" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
