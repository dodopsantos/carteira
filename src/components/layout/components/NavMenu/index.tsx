import React, { ReactElement, useState, useRef } from 'react';
import NavItem from '../NavItem';
import menuItems from '@utils/data/menuItems.json';
import useOnClickOutside from '@hooks/onClickOutsideHook';

export default function NavMenu(): ReactElement {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  useOnClickOutside(menuRef, () => setOpen(false));

  return (
    <div ref={menuRef}>
      <button
        data-collapse-toggle="navbar-default"
        onClick={() => setOpen(!open)}
        type="button"
        className="bg-teal-200 ml-3 items-center rounded p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6 fill-teal-900"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>{' '}
      </button>
      {/*desktop*/}
      <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
        <ul className="flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:text-sm lg:font-medium">
          {menuItems.map((item, key) => (
            <NavItem key={key} title={item.title} to={item.to} />
          ))}
        </ul>
      </div>
      {/*mobile*/}
      {open && (
        <div
          className="absolute top-16 left-5 right-5 z-50 rounded bg-teal-700 lg:block lg:w-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:text-sm lg:font-medium">
            {menuItems.map((item, key) => (
              <NavItem key={key} title={item.title} to={item.to} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
