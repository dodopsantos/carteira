import React from 'react';
import BannerSection from './components/BannerSection';
import InfoSection from './components/InfoSection';

export default function Home(): JSX.Element {
  return (
    <div>
      <BannerSection />
      <InfoSection />
    </div>
  );
}
