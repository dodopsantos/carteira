import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function BackgroundVideo(): ReactElement {
  return (
    <>
      <div className="opacity-70 absolute min-w-full min-h-full w-full overflow-hidden justify-center hidden md:flex z-0">
        <video className="w-full flex" autoPlay muted playsInline loop>
          <source src="/background.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}
