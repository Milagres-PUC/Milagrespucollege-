import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milagres PU College",
  description: "Better Education for Better World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdmin && <Header />}
        <main style={{ minHeight: isAdmin ? "100vh" : "calc(100vh - 400px)" }}>
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
