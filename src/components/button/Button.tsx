import { classes } from '../../util/classes';

interface ButtonProps {
  grouped?: boolean;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  grouped,
  children,
  className,
  active,
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
      className={`border-iron-200 bg-iron-100 px-4 py-2 text-iron-500 transition duration-150 ease-in-out hover:bg-iron-200 hover:text-iron-600 dark:border-iron-900 dark:bg-iron-700 dark:text-iron-300 dark:hover:bg-iron-600 dark:hover:text-iron-200 ${extraClasses} ${
        active
          ? 'bg-iron-200 text-iron-500 dark:bg-iron-600 dark:text-iron-200'
          : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
