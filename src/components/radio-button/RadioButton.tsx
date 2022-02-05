import './RadioButton.css';

interface RadioButtonProps {
  children: React.ReactNode;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  children,
}): JSX.Element => {
  return (
    <label className="inline-flex items-center">
      <input type="radio" className="h-5 w-5 text-iron-400" checked />
      <span className="ml-2 text-gray-400">{children}</span>
    </label>
  );
};
