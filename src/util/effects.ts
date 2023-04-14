export const debounce = (callback: () => void, timeout: number = 400) => {
  let timer: NodeJS.Timeout;
  return (): void => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
};
