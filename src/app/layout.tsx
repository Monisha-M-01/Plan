import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventCraft AI - Full-Stack GenAI Planning Assistant",
  description: "Architect complete weddings, birthdays, and community festivals with mathematical budget guarantees and reverse-chronological milestones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

