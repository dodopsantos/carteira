import React, { ReactElement } from 'react';
import { Text } from '@components/Text';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';

interface Props {
  activityWiki: ActivityWiki;
  callback(e: ActivityWiki): void;
}

export default function Sidebar({
  activityWiki,
  callback
}: Props): ReactElement {
  return (
    <div className="flex w-1/6 flex-col justify-center bg-gray-700">
      {data.map((item, key) => (
        <Text
          key={key}
          size="lg"
          asChild
          className={`${activityWiki.index === item.index && 'text-quincy'}`}
        >
          <button onClick={() => callback(item)}>{item.key}</button>
        </Text>
      ))}
    </div>
  );
}
