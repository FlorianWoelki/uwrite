interface ButtonProps {
  grouped?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  grouped,
  children,
}): JSX.Element => {
  let borderClasses = 'border border-iron-900 rounded';

  if (grouped) {
    borderClasses = '';
  }

  return (
    <button
      type="button"
      className={`px-4 py-2 transition duration-150 ease-in-out text-iron-300 bg-iron-700 hover:text-iron-200 hover:bg-iron-600 ${borderClasses}`}
    >
      {children}
    </button>
  );
};
