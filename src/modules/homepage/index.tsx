import React from 'react';
import BackgroundVideo from './components/backgroundVideo';
import MenuInfo from './components/menuInfo';

export default function Homepage({ rank }): JSX.Element {
  console.log(rank);
  return (
    <>
      <section
        id="first-section"
        className="h-screen md:bg-gray-900 flex items-center justify-center text-gray-100"
      >
        <BackgroundVideo />
        <MenuInfo />
      </section>
      <section
        id="second-section"
        className="relative h-screen md:bg-gray-900 flex items-center justify-center text-gray-100 z-1 before:bg-[url('/module.webp')] before:absolute before:bg-repeat-x before:block before:w-full before:h-7 before:z-1 before:top-0 before:left-0 before:bg-contain"
      >
        <h1>teste</h1>
      </section>
    </>
  );
}
