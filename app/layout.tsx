import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FROGS Indonesia Demo",
  description: "Frontend demo for FROGS Indonesia HR system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
