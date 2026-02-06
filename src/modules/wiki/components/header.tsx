import React, { ReactElement } from 'react';
import { Heading } from '@components/Heading';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';

interface Props {
  activityWiki: ActivityWiki;
  toggle: () => void;
}

export default function Header({ activityWiki, toggle }: Props): ReactElement {
  const title = data?.[activityWiki.index]?.key ?? 'Wiki';

  return (
    <div className="sticky top-0 z-20 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4">
        {/* Mobile toggle */}
        <button
          onClick={toggle}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 lg:hidden"
          aria-label="Open filters"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex flex-1 items-center justify-between">
          <Heading size="lg" className="uppercase tracking-wide text-white">
            {title}
          </Heading>

          <div className="hidden lg:block">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Sword of Fate Wiki
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
