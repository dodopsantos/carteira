import React, { ReactElement, useEffect, useState } from 'react';
import effects from '@utils/data/effects.json';
import dynamic from 'next/dynamic';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function Effects(): ReactElement {
  const [activated, setActivated] = useState(0);
  const [source, setSource] = useState('/luck.mkv');

  useEffect(() => {
    setSource(effects[activated].source);
  }, [activated]);

  return (
    <div className="block h-4/5 w-full justify-center gap-12 md:flex md:w-[80vw]">
      <div className="flex justify-center md:w-1/5">
        <ul className="grid h-full w-full grid-flow-col grid-rows-3 gap-2 rounded md:flex md:flex-col md:gap-2">
          {effects.map((item, idx) => (
            <li
              key={idx}
              onClick={() => setActivated(idx)}
              className={`rounded text-xs md:relative md:text-sm ${
                activated === idx
                  ? 'bg-teal-700 p-2 hover:bg-teal-600'
                  : 'bg-gray-700 p-2 hover:bg-gray-600 '
              } flex cursor-pointer items-center justify-center before:absolute before:top-0 before:left-0 before:block before:h-1 before:w-full before:bg-[url('/label.webp')] before:bg-contain before:bg-repeat-x after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-full after:bg-[url('/label.webp')] after:bg-contain after:bg-repeat-x`}
            >
              <Text size="lg">{item.title}</Text>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-4/5 xl:w-3/5">
        <div className="w-full rounded border-4 border-double border-teal-700 bg-gray-900/50 p-6">
          <Heading size="md" className="max-h-1/5 text-center uppercase">
            {effects[activated].title}
          </Heading>
          <Text size="lg" asChild>
            <p className="max-h-1/5 mx-auto my-4 text-justify">
              {effects[activated].description}
            </p>
          </Text>
          <ReactPlayer
            light="/thumbnail.png"
            className="max-h-3/5 mx-auto my-0 hidden md:block"
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
