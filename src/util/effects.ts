export const debounce = (callback: () => void, timeout: number = 400) => {
  let timer: number;
  return (): void => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
};
