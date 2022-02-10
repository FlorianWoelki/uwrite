export const debounce = (callback: () => void, timeout: number = 300) => {
  let timer: number;
  return (): void => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
};
