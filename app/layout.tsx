// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spot the Narcissistic Behavior",
  description: "Stories and tools for survivors of narcissistic abuse.",
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {/* Header (site-wide) */}
        <header className="bg-card/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">
              Spot the Narcissistic Behavior
            </h1>
            <nav className="space-x-6 text-sm">
              <a href="/" className="hover:text-primary transition">Home</a>
              <a href="/quiz" className="hover:text-primary transition">Quiz</a>
              <a href="/about" className="hover:text-primary transition">About</a>
              <a href="/attraction-traits" className="hover:underline">Traits</a>
              <a href="/checklist" className="hover:text-purple-600 transition">Checklist</a>


            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
