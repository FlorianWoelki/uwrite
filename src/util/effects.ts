/**
 * Debounces a callback and waits a specific amount of time before executing the callback.
 * @param callback Function that is being called when the timeout is done.
 * @param timeout Optional timeout that will be used for the timer (default is `400`ms).
 * @returns Function that can be called to clear the timeout and start a new timeout.
 */
export const debounce = (callback: () => void, timeout: number = 400) => {
  let timer: NodeJS.Timeout;
  return (): NodeJS.Timeout => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
    return timer;
  };
};
