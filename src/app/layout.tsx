import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const eurostile = localFont({
  src: [
    { path: './fonts/Eurostile-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/Eurostile-Bold.otf', weight: '700', style: 'normal' }
  ],
  variable: '--font-eurostile'
});

const eurostileExt = localFont({
  src: [
    { path: './fonts/Eurostile-Extended.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Eurostile-ExtendedBlack.ttf', weight: '900', style: 'normal' }
  ],
  variable: '--font-eurostile-ext'
});

export const metadata: Metadata = {
  title: {
    default: "Sun Global Energi | Kontraktor EPC Solar Panel & PLTS Terbaik",
    template: "%s | Sun Global Energi",
  },
  description: "Sun Global Energi adalah penyedia solusi energi surya (PLTS) terintegrasi untuk sektor komersial dan industri. Kami melayani EPC, O&M, dan pembiayaan proyek tenaga surya untuk efisiensi bisnis Anda.",
  keywords: [
    "Sun Global Energi",
    "EPC Solar Panel",
    "Kontraktor PLTS",
    "PLTS Atap",
    "Panel Surya Indonesia",
    "Instalasi Tenaga Surya",
    "Solar Energy Solution",
    "Renewable Energy Indonesia",
    "Pembangkit Listrik Tenaga Surya",
    "ZNSHINE Solar"
  ],
  authors: [{ name: "Sun Global Energi" }],
  creator: "Sun Global Energi",
  publisher: "Sun Global Energi",
  openGraph: {
    title: "Sun Global Energi | Kontraktor EPC Solar Panel",
    description: "Solusi energi surya terintegrasi untuk kebutuhan industri dan komersial. Turunkan tagihan listrik bisnis Anda dengan PLTS Atap.",
    url: "https://sunglobalenergi.com",
    siteName: "Sun Global Energi",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Sun Global Energi",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sun Global Energi | Solusi Energi Surya",
    description: "Solusi energi surya terintegrasi untuk kebutuhan industri dan komersial.",
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${eurostile.variable} ${eurostileExt.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          <Toaster position="top-right" />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
