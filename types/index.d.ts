declare global {
  type UserChoice = {
    outcome: "accepted" | "dismissed";
    platform: string;
  };

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<UserChoice>;
    prompt(): Promise<void>;
  }

  interface CustomEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

  type EventMap = WindowEventMap & CustomEventMap;

  interface Window {
    addEventListener<K extends keyof EventMap>(
      type: K,
      listener: (this: Document, ev: EventMap[K]) => void,
    ): void;

    removeEventListener<K extends keyof EventMap>(
      type: K,
      listener: (this: Document, ev: EventMap[K]) => void,
    ): void;

    dispatchEvent<K extends keyof CustomEventMap>(ev: EventMap[K]): void;
  }
}

export {};
