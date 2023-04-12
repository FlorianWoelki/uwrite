import { useCallback, useEffect, useRef, useState } from 'react';

export type ThemeType = 'dark' | 'light' | 'system';

export const useDarkModeMedia = (
  theme: ThemeType,
  callback: (type: ThemeType) => void,
): React.MutableRefObject<() => void> => {
  const handleMediaQuery = useCallback(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (theme === 'system') {
      const type = prefersDark ? 'dark' : 'light';
      callback(type);
    }
  }, [theme, callback]);

  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  useEffect(() => {
    const handler = () => mediaListener.current();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', handler);

    // Call function to instantly change theme to system theme.
    handler();

    return () => {
      media.removeEventListener('change', handler);
    };
  }, [mediaListener.current]);

  return mediaListener;
};

export const useDarkMode = (
  mediaChangeCallback?: (type: ThemeType) => void,
): readonly [ThemeType, (themeType: ThemeType) => void] => {
  const [theme, setThemeState] = useState<ThemeType>(
    (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'system',
  );

  const mediaListener = useDarkModeMedia(theme, (type) => {
    const root = window.document.documentElement;
    root.classList.remove(type === 'dark' ? 'light' : 'dark');
    root.classList.add(type === 'dark' ? 'dark' : 'light');
    mediaChangeCallback?.(type);
  });

  const setTheme = (themeType: ThemeType): void => {
    setThemeState(themeType);
  };

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

  return [theme, setTheme] as const;
};
