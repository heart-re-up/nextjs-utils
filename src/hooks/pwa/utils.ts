export const isBeforeInstallPromptEvent = (
  ev: Event,
): ev is BeforeInstallPromptEvent => {
  const hasPlatforms =
    "platforms" in ev && Array.isArray(ev.platforms) && ev.platforms.length > 0;
  const hasPrompt = "prompt" in ev && typeof ev.prompt === "function";
  return hasPlatforms && hasPrompt;
};

const media = "(display-mode: standalone)";

export const matchMedia = () =>
  typeof window === "undefined" ? { matches: false } : window.matchMedia(media);
