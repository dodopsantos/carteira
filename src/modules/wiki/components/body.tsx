import { Text } from '@components/Text';
import { Tooltip } from '@components/Tooltip';
import { Items } from '@interfaces/items';
import { ActivityWiki } from '@pages/wiki';
import IconFromItemId from '@utils/data/iconFromName';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import GridItems from './_gridItems';

interface Props {
  activityWiki: ActivityWiki;
  items: Items;
}

export default function Body({ activityWiki, items }: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex w-full justify-center bg-teal-700">
      <div className="m-4 grid w-full rounded bg-gray-800">
        <GridItems items={items} />
      </div>
    </div>
  );
}
