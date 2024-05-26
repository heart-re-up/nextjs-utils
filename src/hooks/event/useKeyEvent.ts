import { useCallback } from "react";
import useEventListener, { UseEventListenerProps } from "./useEventListener";

export interface UseKeyEventListenerProps
  extends Omit<UseEventListenerProps, "listener" | "type"> {
  key: string[];
  type?: "keyup" | "keydown" | "keypress";
  onKey?: (ev: KeyboardEvent) => void;
}
export default function useKeyEvent(props: UseKeyEventListenerProps) {
  const { ref, key, type = "keypress", onKey, ...others } = props;
  const listener = useCallback(
    (ev: Event) => {
      if (ev instanceof KeyboardEvent && key.includes(ev.key)) {
        onKey?.(ev);
      }
    },
    [key, onKey],
  );
  useEventListener({ ...others, ref, type, listener });
}
