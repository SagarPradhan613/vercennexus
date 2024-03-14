"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import favicon from './favicon.ico' 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NEXUS | Leading Launches</title>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <meta
          name="description"
          content="With a seamless and secure Web3 platform, Nexus is redefining the excellence of community backed launches with its perfectly crafted tools."
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
