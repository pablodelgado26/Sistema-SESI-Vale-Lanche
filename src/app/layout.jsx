import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StudentsProvider } from "@/contexts/StudentsContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SESI - Controle de Vale Lanche",
  description: "Sistema de controle de vale lanche dos alunos SESI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StudentsProvider>
          <Header />
          {children}
        </StudentsProvider>
      </body>
    </html>
  );
}
