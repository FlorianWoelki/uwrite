import { useEffect, useState } from 'react';

const localStorageKey = 'isVimActive';

export const useVim = (): [boolean, (isActive: boolean) => void] => {
  const [isVimActive, setIsVimActive] = useState<boolean>(true);

  useEffect(() => {
    const isActive =
      JSON.parse(localStorage.getItem(localStorageKey) ?? '') ?? true;
    setIsVimActive(isActive);
  }, []);

  const toggleVim = (isActive: boolean): void => {
    setIsVimActive(() => {
      localStorage.setItem(localStorageKey, String(isActive));
      console.log(isActive);
      return isActive;
    });
  };

  return [isVimActive, toggleVim];
};
