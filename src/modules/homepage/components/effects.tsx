import React, { ReactElement, useEffect, useState } from 'react';
import effects from '@utils/data/effects.json';

export default function Effects(): ReactElement {
  const [activated, setActivated] = useState(0);
  const [source, setSource] = useState(effects[0].source);

  useEffect(() => {
    setSource(null);
    setTimeout(() => {
      setSource(effects[activated].source);
    }, 1);
  }, [activated]);

  return (
    <div className="flex justify-center gap-12 w-[80vw] h-4/5">
      <div className="w-1/5">
        <ul className="w-full h-full rounded gap-2 flex flex-col">
          {effects.map((item, idx) => (
            <li
              key={idx}
              onClick={() => setActivated(idx)}
              className={`relative ${
                activated === idx
                  ? 'hover:bg-teal-600 p-2 bg-teal-700'
                  : 'hover:bg-gray-600 p-2 bg-gray-700 '
              } cursor-pointer before:bg-[url('/label.webp')] before:absolute before:bg-repeat-x before:block before:w-full before:h-1 before:top-0 before:left-0 before:bg-contain after:bg-[url('/label.webp')] after:absolute after:bg-repeat-x after:block after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-contain`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/5 xl:w-3/5">
        <div className="bg-gray-900/50 w-full rounded border-double border-4 border-teal-700 p-6">
          <h1 className="text-center uppercase text-xl max-h-1/5">
            {effects[activated].title}
          </h1>
          <p className="text-base text-justify mx-auto my-4 max-h-1/5">
            {effects[activated].description}
          </p>
          {source && (
            <video
              className="max-h-3/5 mx-auto my-0"
              autoPlay
              muted
              playsInline
              loop
            >
              <source src={source} type="video/webm" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
