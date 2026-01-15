import React, { ReactElement } from 'react';
import Navbar from '@components/layout/components/Navbar';
import Footer from '@components/layout/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  footer?: boolean;
}

export default function Layout({
  children,
  footer = false
}: LayoutProps): ReactElement {
  return (
    <div className="font-open-sans flex min-h-screen flex-col bg-gradient-to-b from-[#020617] via-[#020617] to-black">
      <Navbar />

      {/* wrapper do conteúdo, com espaçamento pro navbar fixo */}
      <div className="flex-1 pt-24">
        {children}
      </div>

      {footer && <Footer />}
    </div>
  );
}
