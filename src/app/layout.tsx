import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Shiksha Study | Online admission portal',
  description: 'Study abroad',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${kanit.className} transition-all`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
