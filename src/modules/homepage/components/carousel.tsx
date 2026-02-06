import React, { ReactElement, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/image7.webp',
  '/image1.webp',
  '/image4.webp',
  '/image6.webp',
  '/image2.webp',
  '/image3.webp',
  '/image5.webp'
];

type AnimationVariant = 'fade' | 'slide' | 'blur' | 'bankai';

interface CarouselProps {
  variant?: AnimationVariant;
}

function getMotionProps(variant: AnimationVariant, direction: number) {
  switch (variant) {
    // 1) Fade + leve zoom (o mais suave, sem flicker)
    case 'fade':
      return {
        initial: { opacity: 0, scale: 1.02 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.35, ease: 'easeOut' }
      };

    // 2) Slide parabólico / elástico (entra “voando” e pousa)
    case 'slide':
      return {
        initial: {
          opacity: 0,
          x: 80 * direction,
          y: -12,
          scale: 1.02
        },
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1
        },
        exit: {
          opacity: 0,
          x: -80 * direction,
          y: 12,
          scale: 0.98
        },
        transition: { duration: 0.45, ease: 'easeOut' }
      };

    // 3) Blur dinâmico (entra desfocado e “foca” a cena)
    case 'blur':
      return {
        initial: {
          opacity: 0,
          scale: 1.04,
          filter: 'blur(12px)'
        } as any,
        animate: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)'
        } as any,
        exit: {
          opacity: 0,
          scale: 0.98,
          filter: 'blur(10px)'
        } as any,
        transition: { duration: 0.45, ease: 'easeOut' }
      };

    // 4) Bankai (flash dramático + zoom)
    case 'bankai':
      return {
        initial: {
          opacity: 0,
          scale: 1.06,
          filter: 'brightness(1.8) contrast(1.3)'
        } as any,
        animate: {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1) contrast(1)'
        } as any,
        exit: {
          opacity: 0,
          scale: 0.96,
          filter: 'brightness(0.4) contrast(0.9)'
        } as any,
        transition: { duration: 0.45, ease: 'easeOut' }
      };

    default:
      return {};
  }
}

export default function Carousel({
  variant = 'fade'
}: CarouselProps): ReactElement {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const motionProps = getMotionProps(variant, direction);

  return (
    <div className="relative w-full h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden">

      {/* IMG principal */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Game images"
          className="absolute inset-0 h-full w-full object-cover rounded-xl"
          {...motionProps}
        />
      </AnimatePresence>

      {/* FLASH BANKAI */}
      {variant === 'bankai' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`flash-${index}`}
            className="pointer-events-none absolute inset-0 bg-white mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.2, 1] }}
          />
        </AnimatePresence>
      )}

      {/* Setas */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                   flex h-10 w-10 items-center justify-center
                   rounded-full border border-teal-400/70 bg-black/70
                   text-teal-300 hover:bg-teal-500/15 transition"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                   flex h-10 w-10 items-center justify-center
                   rounded-full border border-teal-400/70 bg-black/70
                   text-teal-300 hover:bg-teal-500/15 transition"
      >
        ›
      </button>

      {/* Bullets */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`
              h-1.5 w-4 rounded-full transition
              ${i === index ? 'bg-teal-400' : 'bg-gray-600/60'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
