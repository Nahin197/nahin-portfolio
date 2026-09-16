import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: 'Md. Khademul Islam Nahin | SQA Automation Engineer & Full-Stack Developer',
  description:
    'Portfolio of Md. Khademul Islam Nahin — Aspiring Jr. SQA Automation Engineer with hands-on experience in Playwright, Postman, Newman, and API testing. Fresh CSE graduate from United International University.',
  keywords: [
    'SQA Engineer',
    'QA Automation',
    'Playwright',
    'Postman',
    'API Testing',
    'Full Stack Developer',
    'Next.js',
    'Bangladesh',
    'Nahin',
  ],
  authors: [{ name: 'Md. Khademul Islam Nahin' }],
  creator: 'Md. Khademul Islam Nahin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Md. Khademul Islam Nahin | SQA Automation Engineer',
    description:
      'Portfolio of Md. Khademul Islam Nahin — Aspiring Jr. SQA Automation Engineer & Full-Stack Developer.',
    siteName: 'Nahin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md. Khademul Islam Nahin | SQA Automation Engineer',
    description:
      'Portfolio of Md. Khademul Islam Nahin — Aspiring Jr. SQA Automation Engineer & Full-Stack Developer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
    <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
