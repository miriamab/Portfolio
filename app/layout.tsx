
import type { Metadata } from "next";
import "./globals.css";
import DotGrid from "./components/DotGrid";
import OverscrollBackground from "./components/OverscrollBackground";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Miriam Abbas - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <OverscrollBackground />
        <div style={{ position: 'relative', minHeight: '100dvh' }}>
          <DotGrid />
          {children}
        </div>
      </body>
    </html>
  );
}
