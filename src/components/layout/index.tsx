import React, { ReactElement } from 'react';
import Navbar from '@components/layout/components/Navbar';
import Footer from '@components/layout/components/Footer';

export default function Layout({ children }: any): ReactElement {
  return (
    <div className="font-open-sans min-h-screen flex-col">
      <Navbar />
      <div className="min-h-100vh">{children}</div>
      <Footer />
    </div>
  );
}
