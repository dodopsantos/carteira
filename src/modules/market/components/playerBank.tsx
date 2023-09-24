import React, { ReactElement } from 'react';
import Image from 'next/image';
import IconFromItemId from '@utils/data/iconFromName';
import { Tooltip } from '@components/Tooltip';

type Bank = {
  ItemName: string;
  Quantity: number;
  ItemId: string;
};

type Props = {
  bank: Array<Bank>;
};

export default function PlayerBank({ bank }: Props): ReactElement {
  return (
    <div className="grid grid-cols-10 gap-1 rounded bg-gray-400 p-2">
      {bank?.map((item: Bank, idx) => {
        return (
          <div
            key={idx}
            className="h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]"
          >
            {item.Quantity != 0 && (
              <Tooltip ItemId={item.ItemId}>
                <Image
                  alt={item.ItemName}
                  src={IconFromItemId(item.ItemId)}
                  width={32}
                  height={32}
                  quality={100}
                />
              </Tooltip>
            )}
          </div>
        );
      })}
    </div>
  );
}
