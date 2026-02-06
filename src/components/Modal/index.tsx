import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type Props = {
  size:
    | 'lg'
    | 'sm'
    | 'md'
    | 'xl'
    | '2xl'
    | 'full'
    | 'xs'
    | '3xl'
    | '4xl'
    | '5xl';
  isOpen: boolean;
  title: string;
  callback: () => void;
  children: ReactNode;
  btnTitle: string;
  onClose: () => void;
};
export default function ModalComponent({
  size,
  isOpen,
  title,
  callback,
  children,
  btnTitle,
  onClose
}: Props) {
  // const handleOpen = () => {
  //   onOpen();
  // };

  return (
    <>
      <Dialog.Root open={isOpen} modal onOpenChange={() => onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your profile here. Click save when you are done.
            </Dialog.Description>
            {children}
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end'
              }}
            >
              <Dialog.Close asChild>
                <button onClick={() => callback()} className="Button green">
                  {btnTitle}
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="IconButton"
                onClick={() => onClose()}
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
