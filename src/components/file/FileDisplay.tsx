import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllFiles, selectCurrentFile } from '../../store';
import { File } from './File';
import { useSaveContent } from '../../hooks/useSaveContent';

export const FileDisplay: React.FC = (): JSX.Element => {
  const currentFile = useSelector(selectCurrentFile);
  const files = useSelector(selectAllFiles);
  const [_, saveContent] = useSaveContent();

  return (
    <ul className="w-full space-y-1 text-sm" style={{ minWidth: '14rem' }}>
      {files.map((file, i) => (
        <File
          key={i}
          active={currentFile.id === file.id}
          onSaveFilename={(filename) => saveContent({ ...file, filename })}
        >
          {file.filename}
        </File>
      ))}
    </ul>
  );
};
