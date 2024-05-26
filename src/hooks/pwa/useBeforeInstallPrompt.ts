import { useCallback, useMemo, useState } from "react";
import useEventListener from "../event/useEventListener";
import { isBeforeInstallPromptEvent } from "./utils";

export interface UsePwaReturnValue {
  promptable: boolean;
  prompt: Promise<boolean>;
}

export default function useBeforeInstallPrompt() {
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent>();
  const [accepted, setAccepted] = useState(false);

  /** 사용자에게 프롬프트를 보여줄 수 있는지 여부입니다. */
  const promptable = useMemo(
    () => !(accepted || deferredEvent === undefined),
    [accepted, deferredEvent],
  );

  const prompt = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      // 저장된 이벤트가 없습니다. 설치 프롬프트를 보여줄 수 없습니다.
      if (deferredEvent === undefined) {
        reject(Error("event is undefined"));
        return;
      }
      // prompt 를 호출하기 전에 사용자 응답을 수신할 수 있도록 합니다.
      deferredEvent.userChoice
        .then((choice: UserChoice) => {
          if (choice.outcome === "accepted") {
            setAccepted(true);
            resolve(true);
          } else resolve(false);
        })
        .catch(reject);
      // 브라우저에서 설치 의사를 묻는 알림창을 띄웁니다.
      deferredEvent.prompt();
    });
  }, [deferredEvent]);

  const listener = useCallback(
    (ev: Event) => {
      if (isBeforeInstallPromptEvent(ev)) {
        ev.preventDefault(); // 크롬67 이하 버전에서 자동적으로 prompt 가 실행되는 것을 방지합니다. (67 버전 포함)
        setDeferredEvent(ev); // 나중에 프롬프트를 발생 시킬 수 있도록 저장합니다.
      }
    },
    [setDeferredEvent],
  );

  // 이벤트 청취
  useEventListener({ type: "beforeinstallprompt", listener });

  return {
    promptable,
    prompt,
  };
}

// Argument of type '"beforeinstallprompt"' is not assignable to parameter of type 'keyof DedicatedWorkerGlobalScopeEventMap'.
