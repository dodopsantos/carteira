import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/image7.png',
  '/image1.png',
  '/image4.png',
  '/image6.png',
  '/image2.png',
  '/image3.png',
  '/image5.png'
];

export default function Carousel(): ReactElement {
  const carousel = useRef<null | HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <div className="w-full my-0 my-auto flex items-center justify-center max-w-[80vw] md:max-w-[60vw]">
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
                className="w-full h-11/12 rounded pointer-events-none"
                src={image}
                alt="alt"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
