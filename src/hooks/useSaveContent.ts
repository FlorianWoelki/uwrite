import { useDispatch, useSelector } from 'react-redux';
import { useIndexedDb } from '../db/hooks/useIndexedDb';
import { File } from '../db/indexedDb';
import { selectCurrentFile } from '../store';
import { setCurrentFileContent } from '../store/features/currentFile';
import { updateFile } from '../store/features/files';

export const useSaveContent = () => {
  const indexedDb = useIndexedDb();

  const dispatch = useDispatch();
  const currentFile = useSelector(selectCurrentFile);

  const saveContent = async (file: File) => {
    dispatch(
      updateFile({
        id: file.id,
        content: { filename: file.filename, value: file.value },
      }),
    );

    if (currentFile.id === file.id) {
      dispatch(
        setCurrentFileContent({ filename: file.filename, value: file.value }),
      );
    }

    if (indexedDb) {
      await indexedDb.putValue('file', file, file.id);
    }
  };

  return [indexedDb, saveContent] as const;
};
