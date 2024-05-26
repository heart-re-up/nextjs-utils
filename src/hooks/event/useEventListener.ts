import { useCallback, useEffect } from "react";

export interface UseEventListenerProps<EL extends HTMLElement = HTMLElement> {
  /**
   * 이벤트를 청취하려는 타겟입니다. 생략하면 window 이벤트를 청취합니다.
   */
  ref?: React.RefObject<EL>;
  type: keyof WindowEventMap | string;
  listener?: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
  debuggable?: boolean;
}

/**
 * 컴포넌트 생명주기에 따라서 자동으로 이벤트 리스너를 등록/해제 합니다.
 * @param props
 */
export default function useEventListener<EL extends HTMLElement = HTMLElement>(
  props: UseEventListenerProps<EL>,
) {
  const {
    type,
    ref,
    listener: listenerProp,
    options,
    debuggable = false,
  } = props;
  const resolveTarget = useCallback(() => {
    if (ref === undefined) {
      const w = typeof window === "undefined" ? undefined : window;
      if (debuggable) {
        console.info("ref is undefined. addEventListener to", w);
      }
      return w;
    }
    if (ref.current === undefined) {
      console.warn(
        "`ref.current` is undefined. Check the `ref` is set to a target element.",
      );
      return undefined;
    }
    return ref.current;
  }, [debuggable, ref]);

  const listener = useCallback(
    (ev: Event) => {
      if (debuggable) {
        console.debug(type, ev);
      }
      if (typeof listenerProp === "function") {
        listenerProp?.(ev);
      } else {
        listenerProp?.handleEvent(ev);
      }
    },
    [debuggable, type, listenerProp],
  );

  // 컴포넌트 마운트/언마운트 시 이벤트 리스너를 등록/해제 합니다.
  useEffect(() => {
    if (debuggable) {
      console.log("addEventListener");
    }
    const target = resolveTarget();
    const callback = listener;
    target?.addEventListener(type, callback, options);
    return () => target?.removeEventListener(type, callback, options);
  }, [debuggable, resolveTarget, type, listener, options]);
}
