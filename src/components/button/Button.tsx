import clsx from 'clsx';

interface ButtonProps {
  /**
   * Whether or not the button is in a button group.
   * @defaultValue `false`
   */
  grouped?: boolean;
  /**
   * Whether or not the button is in an active state or not.
   * @defaultValue `false`
   */
  active?: boolean;
  className?: string;
}

export const Button: React.FC<
  ButtonProps & JSX.IntrinsicElements['button']
> = ({ grouped, className, active, ...rest }): JSX.Element => {
  return (
    <button
      type="button"
      className={clsx(
        'border-iron-200 px-4 py-2 text-iron-500 transition duration-150 ease-in-out hover:bg-iron-200 hover:text-iron-600 disabled:opacity-50 dark:border-iron-900 dark:text-iron-200 dark:hover:bg-iron-600 dark:hover:text-iron-200',
        active
          ? 'bg-iron-200 dark:bg-iron-600 dark:text-iron-200'
          : 'dark:bg-iron-700 bg-iron-100',
        !grouped ? 'border rounded' : undefined,
        className,
      )}
      {...rest}
    ></button>
  );
};
