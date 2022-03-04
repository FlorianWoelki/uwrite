interface FileProps {
  active?: boolean;
  children: React.ReactNode;
}

export const File: React.FC<FileProps> = ({
  active,
  children,
}): JSX.Element => {
  return (
    <li
      className={`cursor-pointer rounded px-3 py-1 transition duration-150 ease-in-out hover:text-iron-900 ${
        active
          ? 'bg-iron-200 text-iron-900 dark:bg-iron-500 dark:text-iron-200'
          : 'text-iron-400'
      }`}
    >
      {children}
    </li>
  );
};
