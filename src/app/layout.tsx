import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { PHProvider } from "./providers";
import { PostHogPageView } from "./posthog-pageview";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yevhenii Tkachenko — Staff Software Engineer",
  description:
    "Personal website of Yevhenii Tkachenko — a staff software engineer who cares about craft, design, and building things that matter.",
  openGraph: {
    title: "Yevhenii Tkachenko — Staff Software Engineer",
    description:
      "Personal website of Yevhenii Tkachenko — a staff software engineer who cares about craft, design, and building things that matter.",
    url: "https://jekatka.github.io",
    siteName: "jekatka.github.io",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <PHProvider>
        <body className="antialiased">
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
