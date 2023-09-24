import React, { ReactElement } from 'react';
import { Heading } from '@components/Heading';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';

interface Props {
  activityWiki: ActivityWiki;
}

export default function Header({ activityWiki }: Props): ReactElement {
  return (
    <div className="flex h-36 w-full items-end justify-center bg-teal-800/95">
      <Heading size="lg" className="uppercase">
        {data[activityWiki.index].key}
      </Heading>
    </div>
  );
}
