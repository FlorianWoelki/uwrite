import React, { useRef, useState } from 'react';

interface InputFieldProps {
  initialValue: string;
  onBlur: (newValue: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  initialValue,
  onBlur,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(initialValue);

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
      onChange={(e) => setValue(e.target.value)}
      onBlur={emitChangeEvent}
      onKeyUp={handleKeyUp}
    />
  );
};
