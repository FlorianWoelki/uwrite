import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode } from '../hooks/useDarkMode';
import { useEffect, useState } from 'react';
import { File } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from '../hooks/useEditorPageParams';
import { ContentPane } from '../components/ContentPane';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFile } from '../store/features/currentFile';
import { addFile, setFiles } from '../store/features/files';
import { useSaveContent } from '../hooks/useSaveContent';
import { selectCurrentFile } from '../store';

export const EditorPage: React.FC = (): JSX.Element => {
  const { id } = useEditorPageParams();
  const currentFile = useSelector(selectCurrentFile);

  const [theme, setTheme] = useDarkMode((type) => setTheme(type));

  const handleThemeChange = async (themeType: ThemeType): Promise<void> => {
    if (themeType === 'system') {
      if (window.theme) {
        await window.theme.setTheme('system');
      } else {
        setTheme('system');
      }
    } else {
      if (window.theme) {
        await window.theme.setTheme(themeType);
      } else {
        setTheme(themeType);
      }
    }
  };

  const [activeTab, setActiveTab] = useState<ToolbarTab>(ToolbarTab.EditorView);

  const [shouldRenderPreview, setShouldRenderPreview] =
    useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(true);

  const [indexedDb, _] = useSaveContent();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!indexedDb) {
      return;
    }

    (async () => {
      const file = await indexedDb.getValue<File>('file', id);
      dispatch(setCurrentFile(file));
      setLoading(false);

      indexedDb.getAllValue<File>('file').then((files) => {
        dispatch(setFiles(files));
      });
    })();
  }, [indexedDb]);

  useEffect(() => {
    if (shouldRenderPreview) {
      setActiveTab(ToolbarTab.PreviewView);
    } else {
      setActiveTab(ToolbarTab.EditorView);
    }
  }, [shouldRenderPreview]);

  const createNewFile = async (): Promise<void> => {
    if (!indexedDb) {
      return;
    }

    dispatch(addFile());
    await indexedDb.putValue('file', { filename: 'Unnamed', value: '' });
  };

  return (
    <div className="relative antialiased">
      {!isLoading && !currentFile && (
        <div className="absolute flex flex-col items-center justify-center w-full h-screen m-auto">
          <p className="text-iron-300">No active file found.</p>
        </div>
      )}

      {isLoading ? (
        <div className="absolute flex items-center justify-center w-full h-screen m-auto">
          <LoadingIndicator className="z-50 w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <>
          <Toolbar
            activeTab={activeTab}
            onEditor={() => setShouldRenderPreview(false)}
            onPreview={() => setShouldRenderPreview(true)}
            onCreateFile={createNewFile}
            onThemeChange={handleThemeChange}
          />

          {currentFile && (
            <div className="w-full h-screen max-w-6xl m-auto">
              <ContentPane
                theme={theme}
                shouldRenderPreview={shouldRenderPreview}
                toggleRender={() => setShouldRenderPreview((p) => !p)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
