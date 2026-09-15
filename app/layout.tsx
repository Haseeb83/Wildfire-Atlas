import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wildfire Atlas | Sample risk explorer",
  description: "Explore Northern California through sample wildfire risk layers and a seven-day illustrative outlook.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
