"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || false;

  return (
    <>
      {!isAdmin && <Header />}
      <main style={{ minHeight: isAdmin ? "100vh" : "calc(100vh - 400px)" }}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
