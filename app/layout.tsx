import localFont from "next/font/local";
import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "next-themes";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Twittee",
    default: "Twittee",
  },
  description: "The Place to post what you feel freely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
