import React, { ReactElement } from 'react';

export default function BackgroundVideo(): ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      <video
        className="h-full w-full object-cover opacity-70"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src="/background.webm" type="video/webm" />
      </video>
    </div>
  );
}
