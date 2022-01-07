import { useCallback, useEffect, useRef, useState } from 'react';

type ThemeType = 'dark' | 'light' | 'system';

export const useDarkMode = (): readonly [
  ThemeType,
  (themeType: ThemeType) => void,
] => {
  const [theme, setThemeState] = useState<ThemeType>(
    (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'system',
  );

  const setTheme = (themeType: ThemeType): void => {
    let newTheme = themeType;
    if (theme === 'system' && newTheme !== 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;

      newTheme = prefersDark ? 'light' : 'dark';
    }

    setThemeState(newTheme);
  };

  const handleMediaQuery = useCallback(() => {
    const root = window.document.documentElement;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (theme === 'system') {
      root.classList.remove(prefersDark ? 'light' : 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');
    }
  }, [theme]);

  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme !== 'system') {
      root.classList.remove(theme === 'dark' ? 'light' : 'dark');
      root.classList.add(theme);

      localStorage.setItem('theme', theme);
    } else {
      mediaListener.current();
      localStorage.removeItem('theme');
    }
  }, [theme]);

  useEffect(() => {
    const handler = () => mediaListener.current();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', handler);

    handler();

    return () => {
      media.removeEventListener('change', handler);
    };
  }, []);

  return [theme, setTheme] as const;
};
