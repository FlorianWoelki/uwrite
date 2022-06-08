import { useState } from 'react';

const localStorageKey = 'isVimActive';

export const useVim = (): [boolean, (isActive: boolean) => void] => {
  const [isVimActive, setIsVimActive] = useState(() => {
    try {
      const item = localStorage.getItem(localStorageKey);
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  const toggleVim = (isActive: boolean): void => {
    setIsVimActive(() => {
      localStorage.setItem(localStorageKey, String(isActive));
      return isActive;
    });
  };

  return [isVimActive, toggleVim];
};
