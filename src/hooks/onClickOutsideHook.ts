import React, { useEffect, RefObject } from 'react';

interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}

export default function useOnClickOutside(ref: RefObject<ValidRefTarget>, handler: (event: MouseEvent | TouchEvent)=>void) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler]
  );
}
