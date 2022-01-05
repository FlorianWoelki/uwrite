interface ButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }): JSX.Element => {
  return (
    <button
      type="button"
      className="px-4 py-2 transition duration-150 ease-in-out border rounded text-iron-300 bg-iron-700 border-iron-900 hover:text-iron-200 hover:bg-iron-600"
    >
      {children}
    </button>
  );
};
