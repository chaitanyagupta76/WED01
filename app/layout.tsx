import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priya & Arjun — Wedding Invitation",
  description:
    "Join us in celebrating the union of Priya and Arjun. A premium Indian wedding experience.",
  keywords: ["wedding", "invitation", "Indian wedding", "Priya", "Arjun"],
  openGraph: {
    title: "Priya & Arjun — Wedding Invitation",
    description: "You are cordially invited to celebrate our union.",
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
      className={`scroll-smooth ${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
