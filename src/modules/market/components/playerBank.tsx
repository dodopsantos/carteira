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
    <div className="grid grid-cols-10 gap-1 bg-gray-400 rounded p-2">
      {bank?.map((item: Bank) => {
        return (
          <div className="w-8 h-8 bg-[#273142] border-solid rounded border-2 border-[#353D4E]">
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
