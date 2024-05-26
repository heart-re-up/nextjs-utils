import { useCallback, useEffect, useState } from "react";
import useVisibilityChange from "../event/useVisibilityChange";

const media = "(display-mode: standalone)";

const matchMedia = () =>
  typeof window === "undefined" ? false : window.matchMedia(media).matches;

export default function usePwaRuntime() {
  const [pwa, setPwa] = useState(matchMedia());
  const evaluate = useCallback(() => setPwa(matchMedia()), [setPwa]);
  const visible = useVisibilityChange();

  useEffect(() => {
    const timeout = setTimeout(evaluate, 0);
    return () => clearTimeout(timeout);
  }, [visible, evaluate]);

  return pwa;
}
