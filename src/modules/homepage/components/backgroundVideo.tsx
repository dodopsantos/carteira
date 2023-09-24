import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function BackgroundVideo(): ReactElement {
  return (
    <>
      <div className="absolute z-0 hidden min-h-full w-full min-w-full justify-center overflow-hidden opacity-70 md:flex">
        <video
          className="flex w-full"
          autoPlay
          muted
          playsInline
          loop
          preload="/preload.webp"
        >
          <source src="/background.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}
