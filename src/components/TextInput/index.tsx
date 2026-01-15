import React from 'react';
import { InputHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface TextInputRootProps {
  children: ReactNode;
}

function TextInputRoot(props: TextInputRootProps) {
  return (
    <div className="flex h-12 w-full items-center gap-3 rounded border bg-gray-800 py-4 px-3 ring-teal-300 focus-within:ring-2">
      {props.children}
    </div>
  );
}

TextInputRoot.displayName = 'TextInput.Root';

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
  return <Slot className="h-6 w-6 text-gray-400">{props.children}</Slot>;
}

TextInputIcon.displayName = 'TextInput.Icon';

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="flex-1 bg-transparent text-xs text-gray-100 outline-none placeholder:text-gray-400"
      {...props}
    />
  );
}

TextInputInput.displayName = 'TextInput.Input';

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon
};
