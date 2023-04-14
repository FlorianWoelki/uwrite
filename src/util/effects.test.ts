import { describe, it, expect, vi } from 'vitest';
import { debounce } from './effects';

describe('debounce', () => {
  it('should call the callback after the specified timeout', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debouncedCallback = debounce(callback);

    debouncedCallback();

    // Fast-forward time by 400ms (default timeout).
    vi.advanceTimersByTime(400);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer on subsequent calls', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debouncedCallback = debounce(callback);

    debouncedCallback();

    debouncedCallback();

    // Fast-forward time by 400ms (default timeout).
    vi.advanceTimersByTime(400);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should accept a custom timeout', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debouncedCallback = debounce(callback, 1000);

    debouncedCallback();

    // Fast-forward time by 1000ms (custom timeout).
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
