import React, { ReactElement } from 'react';
import Navbar from '@components/layout/components/Navbar';
import Footer from '@components/layout/components/Footer';

export default function Layout({ children }: any): ReactElement {
  return (
    <div className="min-h-screen flex-col font-open-sans">
      <Navbar />
      <div className="min-h-100vh">{children}</div>
      <Footer />
    </div>
  );
}
