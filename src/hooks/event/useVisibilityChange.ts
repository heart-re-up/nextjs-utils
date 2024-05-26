import { useCallback, useEffect, useState } from "react";
import useEventListener, { UseEventListenerProps } from "./useEventListener";

export default function useVisibilityChange(
  props: Omit<UseEventListenerProps, "listener" | "type"> = {},
): boolean {
  const [visible, setVisible] = useState(false);
  const evaluate = useCallback(
    () =>
      setVisible(
        typeof document !== "undefined" &&
          document.visibilityState === "visible",
      ),
    [setVisible],
  );

  useEventListener({
    ...props,
    type: "visibilitychange",
    listener: evaluate,
  });

  useEffect(() => evaluate(), [evaluate]);

  return visible;
}
