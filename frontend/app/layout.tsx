/**
 * Author: Miriam Abbas
 */

import type { Metadata } from "next";
import "./globals.css";
import DotGrid from "./components/DotGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Miriam Abbas - Portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <DotGrid />
          {children}
        </div>
      </body>
    </html>
  );
}
