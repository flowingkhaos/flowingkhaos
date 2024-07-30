import type { Metadata } from "next";
import { Inter, Sora, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

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

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "700", "800"],
});

const title =
  "New Media Intelligence - Changez votre approche entrepreunariale.";
const description =
  "Adaptez vous aux nouvelles technologies. Étudiez votre public. Offrez de meilleurs produits. Triplez vos chiffres d'affaire!";
const openGraphImage = {
  url: "/favicon.ico",
  width: 1200,
  height: 630,
};
const robots = "index, follow";
const twitterCard = "summary_large_image";
const twitterHandle = "@flowingkhaos";
const site = "https://flowingkhaos.com";
const type = "website";

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: {
    icon: "/favicon.ico",
  },
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
  metadataBase: new URL("https://flowingkhaos.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${inter.variable} ${montserrat.variable} ${sora.variable}`}
      >
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
            {/* <GoogleAnalytics gaId="G-KPMETBMFNG" /> */}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
