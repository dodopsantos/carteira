import React, { ReactElement } from 'react';
import Navbar from '@components/layout/components/Navbar';
import Footer from '@components/layout/components/Footer';

export default function Layout({ children }): ReactElement {
  return (
    <div className="min-h-screen flex-col font-open-sans">
      <Navbar />
      <div className="min-h-[calc(100vh_-_192px)] ">{children}</div>
      <Footer />
    </div>
  );
}
