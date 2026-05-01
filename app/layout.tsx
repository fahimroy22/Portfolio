import type { Metadata, Viewport } from "next";
import "./globals.css";

import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Fahim Ahmed | Full-Stack Developer",
    template: "%s | Fahim Ahmed",
  },

  description:
    "Portfolio of Fahim Ahmed, a full-stack developer building clean, scalable web products, dashboards, portfolios, and modern web applications.",

  keywords: [
    "Fahim Ahmed",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "Web Developer Portfolio",
  ],

  authors: [{ name: "Fahim Ahmed" }],
  creator: "Fahim Ahmed",

  metadataBase: new URL("https://your-domain.com"), // 🔥 replace after deploy

  openGraph: {
    title: "Fahim Ahmed | Full-Stack Developer",
    description:
      "Clean, scalable web products, dashboards, portfolios, and full-stack applications.",
    url: "https://your-domain.com",
    siteName: "Fahim Ahmed Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Fahim Ahmed Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fahim Ahmed | Full-Stack Developer",
    description:
      "Clean, scalable web products, dashboards, portfolios, and full-stack applications.",
    images: ["/profile.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-white antialiased selection:bg-emerald-400 selection:text-black">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}