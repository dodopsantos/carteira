import React, { ReactElement } from 'react';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';

interface Props {
  activityWiki: ActivityWiki;
  toggle: () => void;
}

export default function Header({ activityWiki, toggle }: Props): ReactElement {
  const title = data?.[activityWiki.index]?.key ?? 'Wiki';

  return (
    <div className="sticky top-[76px] z-20 w-full border-b border-white/10 bg-black/80 backdrop-blur shadow-lg shadow-black/30">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4">
        {/* Mobile toggle */}
        <button
          onClick={toggle}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500/30 lg:hidden"
          aria-label="Open filters"
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex flex-1 items-center justify-between">
          {/* Breadcrumb + título — mesmo padrão do Account */}
          <div>
            <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
              Wiki &gt; {title}
            </Text>
            <Heading
              size="lg"
              className="mt-0.5 text-xl font-extrabold uppercase tracking-wide text-slate-50"
            >
              {title}
            </Heading>
          </div>

          <div className="hidden lg:block">
            <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
              Sword of Fate Wiki
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
