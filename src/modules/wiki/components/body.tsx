import { Text } from '@components/Text';
import { Tooltip } from '@components/Tooltip';
import { Items, Filter } from '@interfaces/items';
import { ActivityWiki } from '@pages/wiki';
import IconFromItemId from '@utils/data/iconFromName';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import GridItems from './_gridItems';

interface Props {
  activityWiki: ActivityWiki;
  items: Items;
  filter: Filter;
}

export default function Body({
  activityWiki,
  items,
  filter
}: Props): ReactElement {
  return (
    <div className="flex w-full justify-center bg-header">
      <div className="m-4 grid h-fit w-full rounded bg-gray-800">
        {activityWiki.index === 0 && (
          <GridItems filter={filter} items={items} />
        )}
      </div>
    </div>
  );
}
