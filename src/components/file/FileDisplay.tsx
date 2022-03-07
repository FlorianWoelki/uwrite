import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllFiles, selectCurrentFile } from '../../store';
import { File as IFile } from '../../db/indexedDb';
import { File } from './File';

interface FileDisplayProps {
  onSaveFilename: (file: IFile) => void;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({
  onSaveFilename,
}): JSX.Element => {
  const currentFile = useSelector(selectCurrentFile);
  const files = useSelector(selectAllFiles);

  return (
    <ul className="w-full space-y-1 text-sm" style={{ minWidth: '14rem' }}>
      {files.map((file, i) => (
        <File
          key={i}
          active={currentFile.id === file.id}
          onSaveFilename={(filename) => onSaveFilename({ ...file, filename })}
        >
          {file.filename}
        </File>
      ))}
    </ul>
  );
};
