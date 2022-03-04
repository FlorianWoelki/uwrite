import React from 'react';
import { File } from './File';

export const FileDisplay: React.FC = (): JSX.Element => {
  return (
    <ul className="w-full space-y-1 text-sm" style={{ minWidth: '14rem' }}>
      <File active>First File</File>
      <File>Second File</File>
    </ul>
  );
};
