import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/image7.webp',
  '/image1.webp',
  '/image4.webp',
  '/image6.webp',
  '/image2.webp',
  '/image3.webp',
  '/image5.webp'
];

export default function Carousel(): ReactElement {
  const carousel = useRef<null | HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <div className="my-0 my-auto flex w-full max-w-[80vw] items-center justify-center md:max-w-[60vw]">
      <motion.div
        ref={carousel}
        className="cursor-grab overflow-hidden"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ right: 0, left: -width + 200 }}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {images.map((image, index) => (
            <motion.div className="min-h-[400px] min-w-[527px] p-4" key={index}>
              <img
                className="h-11/12 pointer-events-none w-full rounded border-2 border-gray-800"
                src={image}
                alt="Game images"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
