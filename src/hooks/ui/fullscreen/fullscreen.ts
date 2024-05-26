import React, { useCallback, useRef, useState } from "react";

export interface UseFullscreenProps<E extends HTMLElement> {
  initialRef: React.RefObject<E>;
}

export interface UseFullscreenReturnValue<E extends HTMLElement> {
  enabled: boolean;
  fullscreen: boolean;
  requestFullscreen(): () => void;
  exitFullscreen(): () => void;
  ref: React.RefCallback<E>;
}

export default function useFullscreen<E extends HTMLElement>(
  props: UseFullscreenProps<E>,
): UseFullscreenReturnValue {
  const ref = useRef<E | null>(null);

  const [enabled, setEnabled] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const setRef = useCallback((instance: E) => {
    setRef(instance);
  });
  const requestFullscreen = useCallback(() => {}, []);
  const exitFullscreen = useCallback(() => {}, []);

  return {
    enabled,
    fullscreen,
  };
}
