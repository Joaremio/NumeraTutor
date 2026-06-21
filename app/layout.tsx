import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NumeraTutor — Sistema Tutor Inteligente",
  description: "Aprenda sistemas de numeração com tutoria inteligente e adaptativa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#0F172A]">{children}</body>
    </html>
  );
}
