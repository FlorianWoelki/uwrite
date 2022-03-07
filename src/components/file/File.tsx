import React from 'react';
import { ReactComponent as PencilIcon } from '../../../assets/icons/pencil.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';

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
      className={`flex cursor-pointer justify-between rounded px-3 py-1 transition duration-150 ease-in-out hover:text-iron-900 ${
        active
          ? 'bg-iron-200 text-iron-900 dark:bg-iron-500 dark:text-iron-200'
          : 'text-iron-400'
      }`}
    >
      <span>{children}</span>
      <div className="flex items-center space-x-1 text-iron-300">
        <button className="transition duration-150 ease-in-out hover:text-iron-400">
          <PencilIcon className="h-4 w-4" />
        </button>
        <button className="transition duration-150 ease-in-out hover:text-iron-400">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};
