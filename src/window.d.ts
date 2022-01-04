export {};

declare global {
  interface Window {
    darkMode?: {
      system: () => Promise<void>;
      toggle: () => Promise<void>;
    };
  }
}
