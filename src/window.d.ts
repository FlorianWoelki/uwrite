import { ThemeType } from './hooks/useDarkMode';

export {};

declare global {
  interface Window {
    theme?: {
      setTheme: (themeType: ThemeType) => Promise<void>;
    };
  }
}
