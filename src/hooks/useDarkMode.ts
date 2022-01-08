import { useCallback, useEffect, useRef, useState } from 'react';

export type ThemeType = 'dark' | 'light' | 'system';

export const useDarkMode = (): readonly [
  ThemeType,
  (themeType: ThemeType) => void,
] => {
  const [theme, setThemeState] = useState<ThemeType>(
    (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'system',
  );

  const setTheme = (themeType: ThemeType): void => {
    let newTheme = themeType;
    // Handles system theme switch to custom theme.
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

  // Use `useRef` for not adding function `handleMediaQuery` to dependency array.
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme !== 'system') {
      // Handle manual theme switching.
      root.classList.remove(theme === 'dark' ? 'light' : 'dark');
      root.classList.add(theme);

      localStorage.setItem('theme', theme);
    } else {
      // Handle `use system default` functionality.
      mediaListener.current();
      localStorage.removeItem('theme');
    }
  }, [theme]);

  useEffect(() => {
    const handler = () => mediaListener.current();

    // Listen for theme system change events.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', handler);

    // Call function to instantly change theme to system theme.
    handler();

    return () => {
      media.removeEventListener('change', handler);
    };
  }, []);

  return [theme, setTheme] as const;
};
