import React, { useEffect, useRef, useState } from 'react';

interface InputFieldProps {
  initialValue: string;
  notDisableFocus?: boolean;
  disabled?: boolean;
  onBlur: (newValue: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  initialValue,
  disabled,
  notDisableFocus,
  onBlur,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (!disabled && notDisableFocus) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const emitChangeEvent = (): void => {
    onBlur(value);
  };

  const handleKeyUp = (e: React.KeyboardEvent): void => {
    if (!inputRef.current) {
      return;
    }

    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      className="cursor-pointer bg-transparent outline-none"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      onBlur={emitChangeEvent}
      onKeyUp={handleKeyUp}
    />
  );
};
