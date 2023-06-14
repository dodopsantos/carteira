import React, { ReactElement, useEffect, useState } from 'react';
import effects from '@utils/data/effects.json';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function Effects(): ReactElement {
  const [activated, setActivated] = useState(0);
  const [source, setSource] = useState('/luck.mkv');

  useEffect(() => {
    setSource(effects[activated].source);
  }, [activated]);

  return (
    <div className="block md:flex justify-center gap-12 w-full md:w-[80vw] h-4/5">
      <div className="w-1/5">
        <ul className="w-full h-full rounded md:gap-2 md:flex md:flex-col grid grid-rows-3 grid-flow-col gap-4">
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
      <div className="w-full md:w-4/5 xl:w-3/5 mt-4 md:mt-0">
        <div className="bg-gray-900/50 w-full rounded border-double border-4 border-teal-700 p-6">
          <h1 className="text-center uppercase text-xl max-h-1/5">
            {effects[activated].title}
          </h1>
          <p className="text-base text-justify mx-auto my-4 max-h-1/5">
            {effects[activated].description}
          </p>
          <ReactPlayer
            className="hidden md:block max-h-3/5 mx-auto my-0"
            url={source}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </div>
    </div>
  );
}
