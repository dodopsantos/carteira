import React, { ReactElement } from 'react';
import { Heading } from '@components/Heading';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';

interface Props {
  activityWiki: ActivityWiki;
  toggle: Function;
}

export default function Header({ activityWiki, toggle }: Props): ReactElement {
  return (
    <div className="flex h-36 w-full items-end gap-4 border-b-4 border-double border-teal-700 bg-gray-800 lg:justify-center">
      <button
        data-collapse-toggle="navbar-default"
        onClick={() => toggle()}
        type="button"
        className="bg-teal-200 ml-3 items-center rounded p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6 fill-white"
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
      <Heading size="lg" className="uppercase">
        {data[activityWiki.index].key}
      </Heading>
    </div>
  );
}
