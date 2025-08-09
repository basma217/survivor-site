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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        {/* Header (site-wide) */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-700">
              Spot the Narcissistic Behavior
            </h1>
            <nav className="space-x-6">
              <a href="/" className="hover:text-purple-600 transition">Home</a>
              <a href="/quiz" className="hover:text-purple-600 transition">Quiz</a>
              <a href="/about" className="hover:text-purple-600 transition">About</a>
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
