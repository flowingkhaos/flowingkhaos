import type { Metadata } from "next";
import { Inter, Oswald, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "700", "800", "900"],
});

const title = "FlowingKhaos - Change the way you learn.";
const description = "Learn to navigate the web efficiently by Wilson Sidney";
const openGraphImage = {
  url: "/public/svg/question.svg",
  width: 1200,
  height: 630,
};
const robots = "index, follow";
const twitterCard = "summary_large_image";
const twitterHandle = "@flowingkhaos";
const site = "https://flowingkhaos.vercel.app";
const type = "website";

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: "/favicon.ico",
  robots: robots,
  openGraph: {
    title: title,
    description: description,
    siteName: site,
    type: type,
    images: [openGraphImage],
  },
  twitter: {
    card: twitterCard,
    title: title,
    description: description,
    site: twitterHandle,
    images: [openGraphImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <header>
          <Navbar />
        </header>
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
