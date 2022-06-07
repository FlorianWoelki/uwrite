import { useEffect, useState } from 'react';

const localStorageKey = 'isVimActive';

export const useVim = (): [boolean, (isActive: boolean) => void] => {
  const [isVimActive, setIsVimActive] = useState<boolean>(false);

  useEffect(() => {
    const item = localStorage.getItem(localStorageKey);
    if (item) {
      const isActive = JSON.parse(item) ?? false;
      setIsVimActive(isActive);
    }
  }, []);

  const toggleVim = (isActive: boolean): void => {
    setIsVimActive(() => {
      localStorage.setItem(localStorageKey, String(isActive));
      return isActive;
    });
  };

  return [isVimActive, toggleVim];
};
