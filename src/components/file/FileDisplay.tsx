import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFiles, selectCurrentFile } from '../../store';
import { File } from './File';
import { useSaveContent } from '../../hooks/useSaveContent';
import { setCurrentFile } from '../../store/features/currentFile';
import { File as DbFile } from '../../db/indexedDb';

export const FileDisplay: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentFile = useSelector(selectCurrentFile);
  const files = useSelector(selectAllFiles);
  const [indexedDb, saveContent] = useSaveContent();

  const deleteFile = async (id: number) => {
    if (!indexedDb) {
      return;
    }

    await indexedDb.deleteValue('file', id);
  };

  const selectFile = (file: DbFile) => {
    dispatch(setCurrentFile(file));
  };

  return (
    <ul className="w-full space-y-1 text-sm" style={{ minWidth: '14rem' }}>
      {files.length === 0 ? (
        <li className="text-iron-400">No files</li>
      ) : (
        files.map((file, i) => (
          <File
            key={i}
            active={currentFile?.id === file.id}
            onSaveFilename={(filename) => saveContent({ ...file, filename })}
            onDelete={() => deleteFile(file.id)}
            onSelect={() => selectFile(file)}
          >
            {file.filename}
          </File>
        ))
      )}
    </ul>
  );
};
