import { classes } from '../../util/classes';

interface ButtonProps {
  grouped?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  grouped,
  children,
  className,
  ...rest
}): JSX.Element => {
  const extraClasses = classes(
    {
      'border rounded': !grouped,
    },
    className,
  );

  return (
    <button
      type="button"
      className={`border-iron-900 px-4 py-2 transition duration-150 ease-in-out text-iron-300 bg-iron-700 hover:text-iron-200 hover:bg-iron-600 ${extraClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
};
